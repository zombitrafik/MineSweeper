(function () {
    angular
        .module('app')
        .controller('PrivateMessagesController', PrivateMessagesController);

    PrivateMessagesController.$inject = ['messagesService'];

    function PrivateMessagesController (messagesService) {
        var vm = this;
        vm.listOfMessage = [
            {test: 'test'}
        ];

        vm.messages = [
            {message: 1},
            {message: 2}
        ];

        vm.isMessageList = true;

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

        vm.getMessagesList = function () {
            return this.listOfMessage;
        };

        vm.goToChat = function (username) {
            vm.isMessageList = false;
            //request
        };

        vm.backToList = function () {
            vm.isMessageList = true;
        };

        vm.getMessages = function () {
            return vm.messages;
        };

        return vm;
    }
})();