(function () {
    angular
        .module('app')
        .service('chatApiService', chatApiService);

    chatApiService.$inject = ['Restangular'];

    function chatApiService (Restuangular) {
        var service = {
            sendLobbyMessage: sendLobbyMessage
        };
        return service;

        function sendLobbyMessage (message) {
            Restuangular.one('rooms', 'message').customPOST(message);
        }

    }
})();