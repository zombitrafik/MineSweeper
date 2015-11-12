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
            send: send,
            roomId: ''
        };
        return service;

        function connect (url, cb) {
            var ws = new SockJS(BASE_URL + url);
            service.client = Stomp.over(ws);
            service.client.connect({}, function () {
                cb();
            });
        }

        function subscribe (url, cb, roomId) {
            service.roomId = roomId;
           /* setTimeout(function () {
                cb([
                    {x: 0, y: 0, value: 1},
                    {x: 1, y: 0, value: 1},
                    {x: 0, y: 1, value: 1},
                    {x: 1, y: 1, value: 1}
                ]);
            }, 2000);*/
/*            service.socket.subscribe(url, function (data) {
                cb(data);
            });*/
            service.client.subscribe(url, function (data) {
                console.log('get data from socket', data);
                //cb(JSON.parse(data).body.);
            });
        }

        function send(url, data) {
            service.client.send('/' + url + service.roomId, {}, JSON.stringify(data));
        }

    }

})();