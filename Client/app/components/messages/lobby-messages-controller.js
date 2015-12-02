(function () {
    angular
        .module('app')
        .controller('LobbyMessagesController', LobbyMessagesController);

    LobbyMessagesController.$inject = ['messagesService'];

    function LobbyMessagesController (messagesService) {
        var vm = this;
        vm.privateMessages = [
            {test: 'test'}
        ];

        vm.header = 'lobby';

        vm.selectTab = function () {
            messagesService.selectTab(vm.header);
        };

        vm.isSelected = function () {
            return messagesService.isSelectedTab(vm.header);
        };

        vm.getTemplate = function () {
            return 'components/messages/templates/' + vm.header.toLowerCase() + '-template.html';
        };

        var messagesList = [
            {list: 'list'}
        ];

        vm.getMessagesList = function () {
            return messagesList;
        };

        return vm;
    }
})();