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
            send: send
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

        function subscribe (url, cb) {
            service.client.subscribe(url, function (data) {
                console.log('get data from socket');
                console.log(JSON.parse(data.body).body);
                cb(JSON.parse(data.body).body);
            });
        }

        function send(url, data) {
            service.client.send(url, {}, JSON.stringify(data));
        }

    }

})();