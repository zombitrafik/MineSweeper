(function () {
    angular
        .module('app')
        .service('messagesApiService', messagesApiService);

    messagesApiService.$inject = ['Restangular'];

    function messagesApiService (Restangular) {
        var service = {
            getMessageList: getMessageList,
            loadPrivateMessage: loadPrivateMessage
        };

        return service;

        function getMessageList () {
            return Restangular.one('users/dialogs').customGET();
        }

        function loadPrivateMessage (username) {
            return Restangular.one('users/dialogs', username).customGET();
        }
    }
})();