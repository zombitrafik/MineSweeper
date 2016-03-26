(function () {
    angular
        .module('app')
        .service('chatService', chatService);

    chatService.$inject = ['$q', '$timeout'];

    function chatService($q, $timeout) {

        var globalChat = {
            id: -1,
            messages: []
        };

        var lobbyChat = {
            id: -2,
            messages: []
        };

        var chats = [
            {
                name: 'zombitrafik',
                id: 0,
                messages: []
            },
            {
                name: 'kimreik',
                id: 1,
                messages: []
            },
            {
                name: 'zombitrafik (twink)',
                id: 2,
                messages: []
            },
            {
                name: 'kimreik (twink)',
                id: 3,
                messages: []
            }
        ];

        var activeChat = globalChat;

        var service = {
            getGlobalChat: getGlobalChat,
            getLobbyChat: getLobbyChat,
            getActiveChat: getActiveChat,
            activateChat: activateChat,
            closeChat: closeChat,
            sendMessage: sendMessage,
            getHistory: getHistory,
            getOpenedChats: getOpenedChats,
            openChat: openChat,
            isLoadingHistory: true
        };

        return service;

        function getGlobalChat() {
            activeChat = globalChat;
            getHistory();
        }

        function getLobbyChat() {
            activeChat = lobbyChat;
            getHistory();
        }

        function getActiveChat() {
            return activeChat;
        }

        function activateChat(id) {
            activeChat = _.find(chats, function (chat) {
                return chat.id == id;
            });
            getHistory();
        }

        function getOpenedChats() {
            return chats;
        }

        function closeChat(id) {
            var index = _.findIndex(chats, function (chat) {
                return chat.id == id;
            });
            chats.splice(index, 1);
        }

        function sendMessage(message) {
            activeChat.messages.push({
                sender: 'zombitrafik',
                message: message
            });
        }

        function getHistory() {
            //TODO: get it by user name
            service.isLoadingHistory = true;

            if (activeChat.messages.length > 3) {
                service.isLoadingHistory = false;
            } else {
                //TODO: find chat by ID and add new messages
                $timeout(function () {
                    activeChat.messages.push({
                        sender: 'zombitrafik',
                        message: Math.random()
                    });
                    service.isLoadingHistory = false;
                }, 1000);

            }
        }

        function openChat(username) {
            var chat = findChat(username);
            if(!chat) {
                chat = createNewChat(username);
            }
            activateChat(chat.id);
        }


        function findChat (username) {
            return _.find(chats, function (chat) {
                return chat.name == username;
            });
        }

        function createNewChat (username) {
            var chat = {
                id: chats.length,
                name: username,
                messages: []
            };
            chats.push(chat);
            return chat;
        }
    }
})();