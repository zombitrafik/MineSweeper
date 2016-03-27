(function () {
    angular
        .module('app')
        .service('chatService', chatService);

    chatService.$inject = ['$q', '$timeout', '$interval', 'notificationService'];

    function chatService($q, $timeout, $interval, notificationService) {


        //TODO: get from userService or another service
        var currentUserName = 'zombitrafik';

        var globalChat = {
            username: -1,
            messages: [],
            unreaded: 1
        };

        var lobbyChat = {
            username: -2,
            messages: [],
            unreaded: 3
        };

        var chats = [];

        var activeChat = globalChat;

        var service = {
            getGlobalChat: getGlobalChat,
            getLobbyChat: getLobbyChat,
            activateGlobalChat: activateGlobalChat,
            activateLobbyChat: activateLobbyChat,
            getActiveChat: getActiveChat,
            activateChat: activateChat,
            closeChat: closeChat,
            sendMessage: sendMessage,
            getHistory: getHistory,
            getOpenedChats: getOpenedChats,
            openChat: openChat,
            isLoadingHistory: true
        };

        init();

        emitter();

        return service;

        function init() {
            notificationService.loadNotifications().then(function (data) {
                var prefix = notificationService.TYPES.MESSAGE + '_';
                for(var key in data) {
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

        function activateGlobalChat () {
            activeChat = globalChat;
            getHistory();
        }

        function activateLobbyChat () {
            activeChat = lobbyChat;
            getHistory();
        }

        function getGlobalChat() {
            return globalChat;
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
        }

        function sendMessage(message) {
            activeChat.messages.push({
                sender: currentUserName,
                message: message
            });
        }

        function getHistory() {
            //TODO: get it by user name
            service.isLoadingHistory = true;

            if (activeChat.isInited) {
                service.isLoadingHistory = false;
                readMessage();
            } else {
                //TODO: find chat by ID and add new messages

                $timeout(function () {
                    service.isLoadingHistory = false;
                    readMessage();
                    activeChat.isInited = true;
                }, 500);

            }
        }

        function readMessage () {
            activeChat.unreaded = 0;
            if(activeChat.username < 0) return;
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

        function messageHandler(data) {
            if (data.sender == activeChat.username) {
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
        }

        function emitter() {
            $interval(function () {
                messageHandler(generateFakeData());
            }, 1000);
        }

        function generateFakeData() {
            return {
                sender: 'user_name' + getRandomInt(1, 4),
                message: Math.random()
            }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
})();