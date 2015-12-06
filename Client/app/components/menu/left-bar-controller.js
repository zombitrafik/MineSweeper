(function () {
    angular
        .module('app')
        .controller('LeftBarController', LeftBarController);

    LeftBarController.$inject = ['pageService', 'loginService', '$state', 'stateService', 'cacheService', 'globalInitService', 'socketService'];

    function LeftBarController (pageService, loginService, $state, stateService, cacheService, globalInitService, socketService) {
        var vm = this;

        vm.hideMenu = function () {
            pageService.toggleMenu();
        };

        vm.isThisPage = function (page) {
            return stateService.isThisPage(page);
        };

        vm.chooseState = function (state) {
            pageService.toggleMenu();
            $state.go(state);
        };

        vm.logout = function () {
            loginService.logout().finally(function () {
                globalInitService.clearService();
                cacheService.clearService();
                socketService.clearService();
                pageService.toggleMenu();
                $state.go('home');
            });

        };

        vm.isLoggined = function () {
            if(cacheService.isInit) {
                return cacheService.local[ROUTE_REQUIRES.AUTH];
            } else {
                return false;
            }
        };

        return vm;
    }
})();