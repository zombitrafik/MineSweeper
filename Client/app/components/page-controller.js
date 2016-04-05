(function () {
    angular
        .module('app')
        .controller('PageController', PageController);

    PageController.$inject = ['pageService'];

    function PageController(pageService) {
        var pageController = this;

        pageController.hasRightbar = function () {
            return pageService.hasRightbar();
        };

        return pageController;
    }
})();