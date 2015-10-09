(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state'];

    function LoginController (LoginService, $state) {
        this.login = function () {
            $state.go('lobby');
        };
        this.register = function () {
            $state.go('register');
        };
    }
})();
