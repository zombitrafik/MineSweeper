(function () {
    angular
        .module('app')
        .service('pageService', pageService);

    pageService.$inject = [];

    function pageService () {
        var service = {
            toggleMenu: toggleMenu,
            isShowMenu: false
        };

        return service;

        function toggleMenu () {
            service.isShowMenu = !service.isShowMenu;
        }
    }
})();