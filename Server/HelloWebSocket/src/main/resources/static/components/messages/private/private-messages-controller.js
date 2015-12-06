(function () {
    angular
        .module('app')
        .controller('PrivateMessagesController', PrivateMessagesController);

    PrivateMessagesController.$inject = ['messagesService', '$state', 'privateMessagesService'];

    function PrivateMessagesController (messagesService, $state, privateMessagesService) {
        var vm = this;
        vm.listOfMessage = [
            {username: 'kimreik'},
            {username: 'zombitrafik'},
            {username: 'kimreik'},
            {username: 'zombitrafik'},
            {username: 'kimreik'},
            {username: 'zombitrafik'},
            {username: 'kimreik'},
            {username: 'zombitrafik'},
            {username: 'kimreik'},
            {username: 'zombitrafik'},
            {username: 'kimreik'},
            {username: 'zombitrafik'},
            {username: 'kimreik'},
            {username: 'zombitrafik'},
            {username: 'kimreik'},
            {username: 'zombitrafik'}
        ];

        vm.messageModel = {
            text: ''
        };

        vm.sendMessage = function () {

        };

        vm.isMessageList = function () {
            return privateMessagesService.isMessageList();
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
            privateMessagesService.loadPrivateMessage(username).then(function () {
                $state.go('messages', {recipient: username});
            });
        };

        vm.loadPrivateMessage = function () {
            privateMessagesService.loadPrivateMessageFromState();
        };

        vm.getMessagesList = function () {
            return privateMessagesService.getListOfMessage();
        };

        vm.loadListMessage = function () {
            privateMessagesService.loadMessageList();
        };

        vm.backToList = function () {
            privateMessagesService.currentMessages = [];
            $state.go('messages', {recipient: ''});
        };

        vm.getMessages = function () {
            return privateMessagesService.getMessages();
        };

        vm.isMyMessage = function (message) {
            return privateMessagesService.isMyMessage(message);
        };

        vm.sendMessage = function () {
            privateMessagesService.sendMessage(vm.messageModel.text);
        };

        vm.startNewChat = function () {
            $state.go('friends', {action: 'CHAT'});
        };

        return vm;
    }
})();