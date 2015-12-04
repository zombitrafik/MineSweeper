(function () {
    angular
        .module('app')
        .controller('PrivateMessagesController', PrivateMessagesController);

    PrivateMessagesController.$inject = ['messagesService', '$state', '$stateParams', 'privateMessagesService'];

    function PrivateMessagesController (messagesService, $state, $stateParams, privateMessagesService) {
        var vm = this;
        vm.listOfMessage = [
            {username: 'kimreik'},
            {username: 'kimreik'},
            {username: 'kimreik'},
            {username: 'kimreik'},
            {username: 'kimreik'},
            {username: 'kimreik'}
        ];

        vm.messages = [
            {
                text: 'some long message from zombitrafik',
                recipient: 'kimreik',
                sender: 'zombitrafik'
            },
            {
                text: 'some long message from zombitrafik',
                recipient: 'kimreik',
                sender: 'zombitrafik'
            },
            {
                text: 'some long message from zombitrafik',
                recipient: 'kimreik',
                sender: 'zombitrafik'
            },
            {
                text: 'some long message from zombitrafik',
                recipient: 'kimreik',
                sender: 'zombitrafik'
            },
            {
                text: 'another text from kimreik',
                recipient: 'zombitrafik',
                sender: 'kimreik'
            }
        ];

        vm.isMessageList = function () {
            console.log(_.isEmpty($stateParams.recipient));
            return _.isEmpty($stateParams.recipient);
        };

        vm.header = 'private';

        vm.selectTab = function () {
            messagesService.selectTab(vm.header);
        };

        vm.isSelected = function () {
            return messagesService.isSelectedTab(vm.header);
        };

        vm.getTemplate = function () {
            return 'components/messages/private/templates/private-template.html';
        };

        vm.goToChat = function (username) {
            $state.go('messages', {recipient: username});
        };

        vm.getMessagesList = function () {
            return this.listOfMessage;
        };

        vm.backToList = function () {
            $state.go('messages', {recipient: ''});
        };

        vm.getMessages = function () {
            return vm.messages;
        };

        vm.isMyMessage = function (message) {
            return privateMessagesService.isMyMessage(message);
        };

        return vm;
    }
})();