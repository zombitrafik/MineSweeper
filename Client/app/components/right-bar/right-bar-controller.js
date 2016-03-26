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

        vm.init = function () {
            chatService.getHistory();
        };

        vm.getActiveChat = function () {
            return chatService.getActiveChat();
        };

        vm.getOpenedChats = function () {
            return chatService.getOpenedChats();
        };

        vm.closeChat = function (id, $event) {
            $event.stopPropagation();
            chatService.closeChat(id);
        };

        vm.activateChat = function (id) {
            chatService.activateChat(id)
        };

        vm.activateGlobalChat = function () {
            chatService.getGlobalChat();
        };

        vm.activateLobbyChat = function () {
            chatService.getLobbyChat();
        };

        vm.sendMessage = function () {
            chatService.sendMessage(vm.inputMessage.message);
            vm.inputMessage.message = '';
        };

        vm.init();

        return vm;
    }
})();