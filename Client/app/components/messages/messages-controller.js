(function () {
    angular
        .module('app')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['messagesService'];

    function MessagesController (messagesService) {
        var vm = this;

        messagesService.selectTab('private');

        return vm;
    }
})();