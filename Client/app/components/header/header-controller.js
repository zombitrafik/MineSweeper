(function () {
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['loginService', '$state'];

    function HeaderController (loginService, $state) {
        var vm = this;

        vm.getCurrentUser = function () {
            return loginService.currentUser;
        };

        vm.logout = function () {
            loginService.logout().finally(function () {
                $state.go('login');
            });
        };

        return vm;
    }
})();