(function () {
    angular
        .module('app')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['friendsService', '$stateParams', '$rootScope'];

    function FriendsController (friendsService, $stateParams, $rootScope) {
        var vm = this;

        vm.users = [];
        vm.friends = [];
        vm.selectedUsers = [];

        vm.init = function () {
            friendsService.getFriendsList().then(function (response) {
                vm.friends = response.data.friends;
            });
        };

        vm.isShowSearch = function () {
            return friendsService.isShowFriendsSearch;
        };

        vm.search = function () {
            var promise = friendsService.search();

            promise.then(function (response) {
                if(_.isEmpty(response)) {
                    vm.users = [];
                    return;
                }
                vm.users = response.data.userList;
                vm.friends = response.data.userList;
            });
        };

        vm.getAction = function () {
            return $stateParams.action;
        };

        vm.selectUser = function (username) {
            if(vm.isSelectedUser(username)) {
                _.remove(vm.selectedUsers, function (name) {
                    return name === username;
                });
            } else {
                vm.selectedUsers.push(username);
            }
        };

        vm.isSelectedUser = function (username) {
            return _.include(vm.selectedUsers, username);
        };


        $rootScope.$watch(function () {
            return friendsService.searchModel.username;
        }, function (newVal) {
            vm.search();
        });

        return vm;
    }
})();