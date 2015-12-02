(function () {
    angular
        .module('app')
        .controller('PrivateMessagesController', PrivateMessagesController);

    PrivateMessagesController.$inject = ['messagesService'];

    function PrivateMessagesController (messagesService) {
        var vm = this;
        vm.privateMessages = [
            {test: 'test'}
        ];

        vm.header = 'private';

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
            {list: 'list'},
            {list: 'list'}
        ];

        vm.getMessagesList = function () {
            return messagesList;
        };

        return vm;
    }
})();