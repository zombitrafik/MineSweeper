(function () {
    angular
        .module('app')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['messagesService'];

    function MessagesController (messagesService) {
        var vm = this;
        vm.privateMessages = [
            {test: 'test'}
        ];

        vm.header = 'private';

        vm.selectTab = function (header) {
            console.log(header);
            messagesService.selectTab(header);
        };

        vm.isSelected = function (header) {
            return messagesService.isSelectedTab(header);
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