(function () {
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['pageService', 'stateService', 'friendsService', 'gameService', '$state', 'notificationService'];

    function HeaderController (pageService, stateService, friendsService, gameService, $state, notificationService) {
        var vm = this;

        vm.isShowMenu = false;
        vm.isShowToolsDropdown = false;
        vm.isShowNotificationDropdown = false;

        vm.getNotifications = function () {
            return notificationService.getNotifications();
        };

        vm.toggleMenu = function () {
            pageService.toggleMenu();
        };

        vm.isThisPage = function (page) {
            return stateService.isThisPage(page);
        };

        vm.toggleFriendSearch = function () {
            friendsService.toggleSearch();
        };

        vm.isShowFriendsSearch = function () {
            return friendsService.isShowFriendsSearch;
        };

        vm.getSearchFieldModel = function () {
            return friendsService.searchModel;
        };

        vm.toggleToolsDropdown = function () {
            vm.isShowToolsDropdown = !vm.isShowToolsDropdown;
        };

        vm.toggleNotificationDropdown = function () {
            if(vm.getNotifications().length > 0) {
                vm.isShowNotificationDropdown = !vm.isShowNotificationDropdown;
            }

        };

        vm.hideToolsDropdown = function () {
            setTimeout(function () {
                if(vm.isShowToolsDropdown)
                    vm.isShowToolsDropdown = false;
            }, 50);

        };

        vm.hideNotificationDropdown = function () {
            setTimeout(function () {
                if(vm.isShowNotificationDropdown)
                    vm.isShowNotificationDropdown = false;
            }, 50);
        };

        vm.leaveRoom = function () {
            gameService.leaveRoom().then(function () {
                $state.go('lobby');
            });
        };

        vm.goToChat = function (username) {
            $state.go('messages', {recipient: username});
        };

        return vm;
    }
})();