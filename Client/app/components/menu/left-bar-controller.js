(function () {
    angular
        .module('app')
        .controller('LeftBarController', LeftBarController);

    LeftBarController.$inject = ['pageService', 'LoginService', '$state'];

    function LeftBarController (pageService, loginService, $state) {
        var vm = this;

        vm.hideMenu = function () {
            pageService.toggleMenu();
        };

        vm.isThisPage = function (page) {
            if(_.isArray(page)) {
                return _.includes(page, $state.current.name)
            }   else {
                return $state.current.name === page;
            }
        };

        vm.chooseState = function (state) {
            pageService.toggleMenu();
            $state.go(state);
        };

        vm.logout = function () {
            loginService.logout().finally(function () {
                pageService.toggleMenu();
                $state.go('home');
            });

        };

        vm.isLoggined = function () {
            return loginService.isLoggined;
        };

        return vm;
    }
})();