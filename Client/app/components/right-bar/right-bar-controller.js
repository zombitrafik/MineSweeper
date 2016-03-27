(function () {
    angular
        .module('app')
        .controller('RightBarController', RightBarController);

    RightBarController.$inject = ['rightBarService', 'chatService'];

    function RightBarController(rightBarService, chatService) {
        var vm = this;

        //TODO: notifications
        /*

         */

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

        return vm;
    }
})();