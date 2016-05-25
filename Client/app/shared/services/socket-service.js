(function () {
    angular
        .module('app')
        .service('socketService', socketService);

    socketService.$inject = ['$q'];
    function socketService ($q) {

        //var BASE_URL = '/';
        //var BASE_URL = 'http://169.254.130.181:8080/';
        var BASE_URL = 'http://192.168.2.33:8090/';

        var service = {
            connect: connect,
            client: {},
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            send: send,
            subscriptions: [],
            ws: undefined,
            unsubscribeAll: unsubscribeAll,
            clearService: clearService
        };

        return service;

        function connect (url) {
            var deferred = $q.defer();
            if(service.ws) {
                deferred.resolve();
            } else {
                var ws = new SockJS(BASE_URL + url);
                service.client = Stomp.over(ws);
                service.client.debug = null;
                service.client.connect({}, function () {
                    service.ws = ws;
                    deferred.resolve();
                });
            }
            return deferred.promise;
        }

        function subscribe (url, cb, sub_key) {
            unsubscribeOne(sub_key);
            var subscription = service.client.subscribe(url, function (data) {
                cb(JSON.parse(data.body));
            });
            service.subscriptions[sub_key] = subscription;
        }

        function unsubscribeOne (sub_key) {
            if(service.subscriptions[sub_key]) {
                service.subscriptions[sub_key].unsubscribe();
                service.subscriptions[sub_key] = undefined;
            }
        }

        function unsubscribe (prefixes, additionalPrefix) {
            for(var i in prefixes) {
                var fullPrefix = prefixes[i] + additionalPrefix;
                if(service.subscriptions[fullPrefix]) {
                    console.log('unsubscribe ', fullPrefix);
                    service.subscriptions[fullPrefix].unsubscribe();
                    service.subscriptions[fullPrefix] = undefined;
                }
            }
        }

        function unsubscribeAll () {
            var prefixes = service.subscriptions;
            for(var i in prefixes) {
                if(prefixes[i]) {
                    prefixes[i].unsubscribe();
                }
            }
            service.subscriptions = [];
        }

        function send(url, data) {
            service.client.send(url, {}, JSON.stringify(data));
        }

        function clearService () {
            service.client = {};
            service.ws = undefined;
            service.subscriptions = [];
        }

    }

})();