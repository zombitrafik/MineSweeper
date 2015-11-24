(function () {
    angular
        .module('app')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = [];

    function FriendsController () {
        var vm = this;

        vm.isShowSearch = true;

        return vm;
    }
})();