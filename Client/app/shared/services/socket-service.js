(function () {
    angular
        .module('app')
        .service('socketService', socketService);

    socketService.$inject = [];
    function socketService () {

        var BASE_URL = 'http://52.28.17.161:8080/';

        var service = {
            connect: connect,
            client: {},
            subscribe: subscribe,
            send: send
        };
        return service;

        function connect (url, cb) {
            var ws = new SockJS(BASE_URL + url);
            service.client = Stomp.over(ws);
            service.client.connect({}, function () {
                cb();
            });
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