(function () {
    angular
        .module('app')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['friendsService'];

    function FriendsController (friendsService) {
        var vm = this;

        vm.isShow

        vm.isShowSearch = true;

        return vm;
    }
})();