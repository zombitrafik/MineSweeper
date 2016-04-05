(function () {
    angular
        .module('app')
        .service('chatApiService', chatApiService);

    chatApiService.$inject = ['Restangular'];

    function chatApiService (Restuangular) {
        var service = {
            sendLobbyMessage: sendLobbyMessage,
            loadChatHistory: loadChatHistory
        };
        return service;

        function sendLobbyMessage (message) {
            return Restuangular.one('rooms', 'message').customPOST(message);
        }

        function loadChatHistory (username) {
            return Restuangular.one('users/dialogs', username).customGET();
        }

    }
})();