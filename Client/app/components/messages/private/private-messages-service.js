(function () {
    angular
        .module('app')
        .service('privateMessagesService', privateMessagesService);

    privateMessagesService.$inject = ['$stateParams', 'cacheService'];

    function privateMessagesService ($stateParams, cacheService) {
        var service = {
            handleMessages: handleMessages,
            currentMessages: [],
            isMyMessage: isMyMessage
        };

        return service;

        function handleMessages (messageData) {
            var currentChat = $stateParams.recipient;
            var message = messageData.data.message;
            var currentUser = cacheService.local[ROUTE_REQUIRES.AUTH].data;
            if(currentChat === message.sender || currentUser.username === message.sender) {
                service.currentMessages.push(message);
            } else {
                console.log('NOTIFICATION');
            }
        }

        function isMyMessage (message) {
            var currentUser = cacheService.local[ROUTE_REQUIRES.AUTH].data;
            return currentUser.username === message.sender;
        }
    }
})();