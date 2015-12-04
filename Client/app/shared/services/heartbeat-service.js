(function () {
    angular
        .module('app')
        .service('heartbeatService', heartbeatService);
    
    heartbeatService.$inject = ['socketService'];
        
    function heartbeatService (socketService) {
        var service = {
            handleHeartbeat: handleHeartbeat
        };
        return service;


        function handleHeartbeat () {
            socketService.send('/users/heartbeat', {});
        }
        

    }
})();