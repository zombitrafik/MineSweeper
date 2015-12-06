(function () {
    angular
        .module('app')
        .service('privateMessagesService', privateMessagesService);

    privateMessagesService.$inject = ['$stateParams', 'cacheService', 'socketService', '$rootScope', 'messagesService', 'notificationService'];

    function privateMessagesService ($stateParams, cacheService, socketService, $rootScope, messagesService, notificationService) {
        var service = {
            handleMessages: handleMessages,
            currentMessages: [],
            isMyMessage: isMyMessage,
            isMessageList: isMessageList,
            sendMessage: sendMessage,
            getMessages: getMessages,
            getListOfMessage: getListOfMessage,
            listOfMessage: [],
            loadMessageList: loadMessageList,
            loadPrivateMessage: loadPrivateMessage,
            loadPrivateMessageFromState: loadPrivateMessageFromState
        };

        return service;

        function handleMessages (messageData) {
            var currentChat = $stateParams.recipient;
            var message = messageData.data.message;
            var currentUser = cacheService.local[ROUTE_REQUIRES.AUTH].data;
            if(currentChat === message.sender || currentUser.username === message.sender) {
                service.currentMessages.push(message);
            } else {
                var TYPES = notificationService.TYPES;
                notificationService.notify(TYPES.MESSAGE, message);
            }
            $rootScope.$apply();
        }

        function isMyMessage (message) {

            var currentUser = cacheService.local[ROUTE_REQUIRES.AUTH];
            if(currentUser) {
                currentUser = currentUser.data;
                return currentUser.username === message.sender;
            } else {
                return false;
            }

        }

        function isMessageList () {
            return _.isEmpty($stateParams.recipient);
        }

        function getMessages  () {
            return service.currentMessages;
        }

        function sendMessage (text) {
            var recipient = $stateParams.recipient;
            socketService.send('/users/sendMessage', {recipient: recipient, message: text});
        }

        function getListOfMessage () {
            return service.listOfMessage;
        }

        function loadMessageList () {
            messagesService.getMessageList().then(function (response) {
                service.listOfMessage = response.data.dialogs;
            });
        }

        function loadPrivateMessage (username) {

            readMessages(username);

            var promise = messagesService.loadPrivateMessage(username);
            promise.then(function (response) {
                var dialog = response.data.dialog;
                var messages = [];
                if(dialog) {
                    messages = dialog.messages;
                }
                service.currentMessages = messages;
            });
            return promise;
        }

        function readMessages (username) {
            var TYPES = notificationService.TYPES;
            notificationService.remove(TYPES.MESSAGE + '_' + username);
        }

        function loadPrivateMessageFromState () {
            var recipient = $stateParams.recipient;
            service.loadPrivateMessage(recipient);
        }
    }
})();