(function () {
    angular
        .module('app')
        .service('globalInitService', globalInitService);
    
    globalInitService.$inject = ['$q', 'socketService', 'messagesService', 'heartbeatService'];
        
    function globalInitService ($q, socketService, messagesService, heartbeatService) {
        var service = {
            init: init,
            isInit: false,
            socketPrefixes: {
                HEARTBEAT: 'HEARTBEAT_',
                MESSAGES: 'MESSAGES_'
            }
        };
        return service;

        function init () {
            var deferred = $q.defer();
            socketService.connect('game').then(function () {
                socketService.subscribe('/user/broker/messages', messagesService.handleMessages, service.socketPrefixes.MESSAGES);
                socketService.subscribe('/broker/heartBeat', heartbeatService.handleHeartbeat, service.socketPrefixes.HEARTBEAT);

                service.isInit = true;
                deferred.resolve();
            });
            return deferred.promise;
        }
    }
})();
