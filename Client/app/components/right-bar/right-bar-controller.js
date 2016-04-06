(function () {
    angular
        .module('app')
        .controller('RightBarController', RightBarController);

    RightBarController.$inject = ['chatService', 'pageService', 'lobbyService', 'gameService', '$state'];

    function RightBarController(chatService, pageService, lobbyService, gameService, $state) {
        var vm = this;

        //TODO: notifications
        /*

         */

        var notifications = [
            {id: 1, title: 1},
            {id: 2, title: 2}
        ];


        vm.inputMessage = {
            message: ''
        };

        vm.isMessagesLoaded = false;

        vm.isLoadingHistory = function () {
            return chatService.isLoadingHistory;
        };

        vm.getActiveChat = function () {
            return chatService.getActiveChat();
        };

        vm.getOpenedChats = function () {
            return chatService.getOpenedChats();
        };

        vm.closeChat = function (username, $event) {
            $event.stopPropagation();
            chatService.closeChat(username);
        };

        vm.activateChat = function (username) {
            chatService.openChat(username)
        };

        vm.getLobbyChat = function () {
            return chatService.getLobbyChat();
        };

        vm.activateLobbyChat = function () {
            chatService.activateLobbyChat();
        };

        vm.sendMessage = function () {
            chatService.sendMessage(vm.inputMessage.message);
            vm.inputMessage.message = '';
        };

        vm.hasRightbar = function () {
            return pageService.hasRightbar();
        };

        vm.getMinesCount = function () {
            if(lobbyService.roomInfo && lobbyService.roomInfo.game) {
                return lobbyService.roomInfo.game.mineField.minesCount;
            }
        };

        vm.getFieldSize = function () {
            if(lobbyService.roomInfo && lobbyService.roomInfo.game) {
                return lobbyService.roomInfo.game.mineField.width + 'x' + lobbyService.roomInfo.game.mineField.height;
            }
        };

        vm.leaveRoom = function () {
            gameService.leaveRoom().finally(function () {
                $state.go('room-list');
            });
        };

        return vm;
    }
})();