(function () {
    angular
        .module('app')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['friendsService', '$stateParams'];

    function FriendsController (friendsService, $stateParams) {
        var vm = this;

        vm.users = [];
        vm.searchModel = {
            username: ''
        };

        vm.isShowSearch = function () {
            return friendsService.isShowFriendsSearch;
        };

        vm.search = function () {
            var promise = friendsService.search(vm.searchModel);

            promise.then(function (response) {
                console.log(response);
                vm.users = response.data.userList;
            });
        };

        vm.getAction = function () {
            return $stateParams.action;
        };

        return vm;
    }
})();