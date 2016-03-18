(function () {
    angular
        .module('app')
        .controller('PageController', PageController);

    PageController.$inject = ['pageService'];

    function PageController(pageService) {
        var pageController = this;

        pageController.isShowMenu = function () {
            return pageService.isShowMenu;
        };

        return pageController;
    }
})();