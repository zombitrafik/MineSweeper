(function () {
    angular
        .module('app')
        .controller('PageController', PageController);

    PageController.$inject = ['pageService', 'friendsDialogService'];

    function PageController(pageService, friendsDialogService) {
        var pageController = this;

        pageController.isShowMenu = function () {
            return pageService.isShowMenu;
        };

        pageController.isShowFriendMenuDialog = function () {
            return friendsDialogService.isShow;
        };

        return pageController;
    }
})();