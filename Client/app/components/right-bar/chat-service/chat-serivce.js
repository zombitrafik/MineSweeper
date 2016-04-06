(function () {
    angular
        .module('app')
        .service('chatService', chatService);

    chatService.$inject = ['$rootScope', 'notificationService', 'loginService', 'socketService', 'chatApiService'];

    function chatService($rootScope, notificationService, loginService, socketService, chatApiService) {

        var lobbyChat = {
            username: -2,
            messages: [],
            unreaded: 0
        };

        var chats = [];

        var activeChat = lobbyChat;

        var service = {
            getLobbyChat: getLobbyChat,
            addLobbyMessage: addLobbyMessage,
            activateLobbyChat: activateLobbyChat,
            getActiveChat: getActiveChat,
            activateChat: activateChat,
            closeChat: closeChat,
            sendMessage: sendMessage,
            messageHandler: messageHandler,
            getHistory: getHistory,
            getOpenedChats: getOpenedChats,
            openChat: openChat,
            isLoadingHistory: false
        };

        init();

        return service;

        function init() {
            notificationService.loadNotifications().then(function (data) {
                var prefix = notificationService.TYPES.MESSAGE + '_';
                for(var key in data) {
                    if(key.replace(prefix, '') == -2) {
                        lobbyChat.unreaded = data[key];
                        continue;
                    }
                    chats.push({
                        unreaded: data[key],
                        username: key.replace(prefix, ''),
                        messages: [],
                        isInited: false
                    })
                }
                getHistory();
            });
        }

        function activateLobbyChat () {
            activeChat = lobbyChat;
            getHistory();
        }

        function getLobbyChat() {
            return lobbyChat;
        }

        function getActiveChat() {
            return activeChat;
        }

        function activateChat(chat) {
            activeChat = chat;
            getHistory(chat);
        }

        function getOpenedChats() {
            return chats;
        }

        function closeChat(username) {
            var index = _.findIndex(chats, function (chat) {
                return chat.username == username;
            });
            chats.splice(index, 1);
            var TYPES = notificationService.TYPES;
            notificationService.remove(TYPES.MESSAGE + '_' + username);
            activateChat(lobbyChat);
        }

        function sendMessage(message) {

            //LOBBY CHAT
            if(activeChat.username == -2) {
                chatApiService.sendLobbyMessage(message);
            } else {
                // PERSONAL CHAT
                socketService.send('/users/sendMessage', {recipient: activeChat.username, message: message});
            }

/*            activeChat.messages.push({
                sender: currentUserName,
                message: message
            });*/
        }

        function getHistory() {
            //LOBBY
            if(activeChat.username == -2) {
                readMessage();
            } else {
                service.isLoadingHistory = true;

                var chatLink = findChat(activeChat.username);

                if (chatLink.isInited) {
                    service.isLoadingHistory = false;
                    readMessage();
                } else {
                    //TODO: find chat by ID and add new messages
                    chatApiService.loadChatHistory(chatLink.username).then(function (history) {
                        service.isLoadingHistory = false;
                        if(history.data.dialog == null) {
                            history.data.dialog = {
                                messages: []
                            }
                        }
                        chatLink.messages = history.data.dialog.messages;
                        readMessage();
                        chatLink.isInited = true;
                    });
                }
            }
        }

        function readMessage () {
            activeChat.unreaded = 0;
            var TYPES = notificationService.TYPES;
            notificationService.set(TYPES.MESSAGE + '_' + activeChat.username, 0);
        }

        function openChat(username) {
            var chat = findChat(username);
            if (!chat) {
                chat = createNewChat(username);
            }
            activateChat(chat);
        }


        function findChat(username) {
            return _.find(chats, function (chat) {
                return chat.username == username;
            });
        }

        function createNewChat(username) {
            var chat = {
                username: username,
                unreaded: 0,
                messages: []
            };
            chats.push(chat);
            return chat;
        }

        function messageHandler(response) {
            var data = response.data.message;

            var currentUserName = loginService.currentUser.username;
            if (data.sender == activeChat.username || data.sender == currentUserName) {
                activeChat.messages.push(data);
            } else {
                var TYPES = notificationService.TYPES;
                notificationService.notify(TYPES.MESSAGE, data);

                var chat = findChat(data.sender);
                if(!chat) {
                    chat = createNewChat(data.sender);
                }
                chat.messages.push(data);
                chat.unreaded++;
            }
            $rootScope.$apply();
        }

        function addLobbyMessage (data) {
            if (activeChat.username == lobbyChat.username) {
                lobbyChat.messages.push(data);
            } else {
                var TYPES = notificationService.TYPES;
                notificationService.notify(TYPES.MESSAGE, {sender: lobbyChat.username});
                lobbyChat.unreaded++;
                lobbyChat.messages.push(data);
            }
            $rootScope.$apply();
        }

    }
})();