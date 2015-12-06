(function () {
    angular
        .module('app')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['friendsService', '$stateParams', '$rootScope', '$state'];

    function FriendsController (friendsService, $stateParams, $rootScope, $state) {
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

        vm.addToFriend = function (user) {
            var promise = friendsService.addToFriend(user.username);
            promise.then(function () {
                console.log('prock');
                _.remove(vm.users, function (existUser) {
                    return existUser.username === user.username;
                });
                vm.friends.push(user);
            });
        };

        vm.removeFromFriend = function (user) {
            var promise = friendsService.removeFromFriend(user.username);
            promise.then(function () {
                _.remove(vm.friends, function (existFriend) {
                    return existFriend.username === user.username;
                });
                vm.users.push(user);
            });
        };

        $rootScope.$watch(function () {
            return friendsService.searchModel.username;
        }, function (newVal) {
            vm.search();
        });

        vm.openChat = function (username) {
            $state.go('messages', {recipient: username});
        };

        return vm;
    }
})();