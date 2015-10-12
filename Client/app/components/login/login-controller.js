(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state'];

    function LoginController (LoginService, $state) {

        var vm = this;

        vm.model = {
            username: '',
            password: ''
        };

        vm.login = function () {
            LoginService.login(vm.model).then(function () {
                $state.go('lobby');
            });
        };
        vm.register = function () {
            $state.go('register');
        };
    }
})();
