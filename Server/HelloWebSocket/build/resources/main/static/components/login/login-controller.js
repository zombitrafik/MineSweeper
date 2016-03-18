(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['loginService', '$state'];

    function LoginController (loginService, $state) {

        var vm = this;

        vm.model = {
            username: '',
            password: ''
        };

        vm.errors = {};

        vm.login = function () {
            this.clearErrors();
            if(this.validateModel()) {
                return;
            }

            loginService.login(vm.model).then(function () {
                $state.go('lobby');
            }).catch(function () {
                vm.errors.username = 'Wrong username or password';
            });

        };
        vm.register = function () {
            $state.go('register');
        };

        vm.logout = function () {
            loginService.logout().then(function () {
                $state.go('login');
            }, function () {
                console.log('fail');
                $state.go('login');
            });
        };

        vm.clearErrors = function () {
            this.errors = {};
        };

        vm.validateModel = function () {
            var hasError = false;
            if(vm.model.username.trim() === '') {
                hasError = true;
                this.errors.username = 'Username is required';
            }
            if(vm.model.password.trim() === '') {
                hasError = true;
                this.errors.password = 'Password is required';
            }
            return hasError;
        }
    }
})();
