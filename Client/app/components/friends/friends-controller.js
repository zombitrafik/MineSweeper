(function () {
    angular
        .module('app')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['friendsService'];

    function FriendsController (friendsService) {
        var vm = this;

        vm.data = [];
        vm.searchModel = {
            username: ''
        };

        vm.isShowSearch = function () {
            return friendsService.isShowFriendsSearch;
        };

        vm.search = function () {
            var promise = friendsService.search(vm.searchModel);

            promise.then(function (response) {
                vm.data = response;
            });
        };

        return vm;
    }
})();