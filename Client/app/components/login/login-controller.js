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

        vm.pending = false;

        vm.error = undefined;

        vm.login = function () {
            vm.clearErrors();
            if(vm.validateModel()) {
                return;
            }
            vm.pending = true;
            loginService.login(vm.model).then(function () {
                if(loginService.currentUser.currentRoomid != 0) {
                    $state.go('lobby', {id: loginService.currentUser.currentRoomid});
                } else {
                    $state.go('room-list');
                }
            }).catch(function () {
                vm.error = ERRORS_KEYS.WRONG_USERNAME_OR_PASSWORD;
            }).finally(function () {
                vm.pending = false;
            })

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
            vm.error = undefined;
        };

        vm.validateModel = function () {
            var hasError = false;
            if(vm.model.username.trim() === '') {
                hasError = true;
                vm.error = 'Wrong username or password';
            }
            if(vm.model.password.trim() === '') {
                hasError = true;
                vm.error = 'Wrong username or password';
            }
            return hasError;
        }
    }
})();
