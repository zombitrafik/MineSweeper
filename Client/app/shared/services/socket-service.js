(function () {
    angular
        .module('app')
        .service('socketService', socketService);

    socketService.$inject = [];
    function socketService () {
        var service = {
            connect: connect,
            socket: {},
            subscribe: subscribe
        };
        return service;

        function connect (url, cb) {
            var ws = new SockJS(url);
            var client = Stomp.over(ws);
            /*client.connect({}, function () {
                cb();
            });*/
            cb();
        }

        function subscribe (url, cb) {
            setTimeout(function () {
                cb([
                    {x: 0, y: 0, value: 0},
                    {x: 1, y: 0, value: 0},
                    {x: 0, y: 1, value: 0},
                    {x: 1, y: 1, value: 0}
                ]);
            }, 2000);
/*            service.socket.subscribe(url, function (data) {
                cb(data);
            });*/
        }
    }

})();