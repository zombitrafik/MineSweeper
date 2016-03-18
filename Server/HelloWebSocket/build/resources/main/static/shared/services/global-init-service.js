(function () {
    angular
        .module('app')
        .service('globalInitService', globalInitService);
    
    globalInitService.$inject = ['$q', 'socketService', 'privateMessagesService', 'heartbeatService', 'notificationService'];
        
    function globalInitService ($q, socketService, privateMessagesService, heartbeatService, notificationService) {
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
                socketService.subscribe('/user/broker/messages', privateMessagesService.handleMessages, service.socketPrefixes.MESSAGES);
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
