(function () {
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['pageService', 'stateService', 'friendsService'];

    function HeaderController (pageService, stateService, friendsService) {
        var vm = this;

        vm.isShowMenu = false;

        vm.notifications = [{
            type: 'test',
            data: 'test data'
        }];

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


        return vm;
    }
})();