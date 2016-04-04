(function () {
    angular
        .module('app')
        .service('globalInitService', globalInitService);
    
    globalInitService.$inject = ['$q', 'socketService', 'chatService', 'heartbeatService', 'notificationService', 'lobbyService'];
        
    function globalInitService ($q, socketService, chatService, heartbeatService, notificationService, lobbyService) {
        var service = {
            init: init,
            isInit: false,
            socketPrefixes: {
                HEARTBEAT: 'HEARTBEAT',
                MESSAGES: 'MESSAGES'
            },
            clearService: clearService
        };
        return service;

        function init () {
            var deferred = $q.defer();

            notificationService.init();
            socketService.connect('game').then(function () {

                socketService.subscribe('/user/broker/messages', chatService.messageHandler, service.socketPrefixes.MESSAGES);
                socketService.subscribe('/broker/heartBeat', heartbeatService.handleHeartbeat, service.socketPrefixes.HEARTBEAT);

                service.isInit = true;
                deferred.resolve();
            });
            return deferred.promise;
        }

        function clearService () {
            service.isInit = false;
        }
    }
})();
