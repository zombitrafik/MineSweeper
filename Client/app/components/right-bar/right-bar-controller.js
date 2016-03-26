(function () {
    angular
        .module('app')
        .controller('RightBarController', RightBarController);

    RightBarController.$inject = ['rightBarService'];

    function RightBarController (rightBarService) {
        var vm = this;

        //TODO: global/lobby chat object
        /*
            tabs activate content
            send messages
            add new chat
             spinners
         */

        var chats = [
            {
                name: 'zombitrafik',
                id: 1
            },
            {
                name: 'kimreik',
                id: 2
            },
            {
                name: 'zombitrafik (twink)',
                id: 3
            },
            {
                name: 'kimreik (twink)',
                id: 4
            }
        ];

        vm.activeChat = chats[0];

        vm.getOpenedChats = function () {
            return chats;
        };

        vm.closeChat = function (id, $event) {
            $event.stopPropagation();
            var index = _.findIndex(chats, function (chat) {
                return chat.id == id;
            });
            chats.splice(index, 1);
        };

        vm.activateChat = function (id) {
            vm.activeChat = _.find(chats, function (chat) {
                return chat.id == id;
            });
        };

        vm.activateGlobalChat = function () {
            vm.activeChat = {
                id: -1
            };
        };

        vm.activateLobbyChat = function () {
            vm.activeChat = {
                id: -2
            };
        };

        return vm;
    }
})();