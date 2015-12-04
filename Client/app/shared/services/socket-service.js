(function () {
    angular
        .module('app')
        .service('socketService', socketService);

    socketService.$inject = ['$q'];
    function socketService ($q) {

        var BASE_URL = 'http://52.28.17.161:8080/';

        var service = {
            connect: connect,
            client: {},
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            send: send,
            subscriptions: [],
            ws: undefined,
            unsubscribeAll: unsubscribeAll
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
            var subscription = service.client.subscribe(url, function (data) {
                cb(JSON.parse(data.body));
            });
            service.subscriptions[sub_key] = subscription;
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
                prefixes[i].unsubscribe();
            }
            service.subscriptions = [];
        }

        function send(url, data) {
            service.client.send(url, {}, JSON.stringify(data));
        }

    }

})();