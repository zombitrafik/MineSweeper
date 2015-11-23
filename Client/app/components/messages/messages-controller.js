(function () {
    angular
        .module('app')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = [];

    function MessagesController () {
        var vm = this;
        vm.worldMessages = [
            {test: 'test'}
        ];
        return vm;
    }
})();