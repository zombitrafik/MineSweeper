(function () {
    angular
        .module('app')
        .controller('RightBarController', RightBarController);

    RightBarController.$inject = ['rightBarService', 'chatService', 'pageService'];

    function RightBarController(rightBarService, chatService, pageService) {
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

        vm.getGlobalChat = function () {
            return chatService.getGlobalChat();
        };

        vm.getLobbyChat = function () {
            return chatService.getLobbyChat();
        };

        vm.activateGlobalChat = function () {
            chatService.activateGlobalChat();
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
            return 200;
        };

        vm.getFieldSize = function () {
            return '20x25';
        };

        return vm;
    }
})();