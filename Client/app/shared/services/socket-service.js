(function () {
    angular
        .module('app')
        .service('socketService', socketService);

    socketService.$inject = ['cacheService', '$q'];
    function socketService (cacheService, $q) {

        var BASE_URL = 'http://52.28.17.161:8080/';

        var service = {
            connect: connect,
            client: {},
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            send: send,
            subscriptions: []
        };

        return service;

        function connect (url) {
            var deferred = $q.defer();
            var ws = new SockJS(BASE_URL + url);
            service.client = Stomp.over(ws);
            service.client.connect({}, function () {
                deferred.resolve();
            });
            return deferred.promise;
        }

        function subscribe (url, cb, sub_key) {
            var subscription = service.client.subscribe(url, function (data) {
                console.log(data);
                cb(JSON.parse(data.body));
            });

            service.subscriptions[sub_key] = subscription;
        }

        function unsubscribe (sub_key) {
            if(service.subscriptions[sub_key]) {
                service.subscriptions[sub_key].unsubscribe();
                service.subscriptions[sub_key] = undefined;
            }
        }

        function send(url, data) {
            service.client.send(url, {}, JSON.stringify(data));
        }

    }

})();