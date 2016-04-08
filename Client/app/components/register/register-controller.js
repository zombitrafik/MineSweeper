(function () {
    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['registerService', '$state'];

    function RegisterController (registerService, $state) {
        var vm = this;

        vm.model = {
            username: '',
            password: '',
            matchingPassword: ''
        };

        vm.error = undefined;

        vm.pending = false;

        vm.login = function () {
            $state.go('login');
        };

        vm.register = function () {
            vm.clearErrors();
            if(vm.validateModel()) {
                return;
            }
            vm.pending = true;
            registerService.register(vm.model).then(function () {
                $state.go('login');
            }).catch(function (errorPayload) {
                var error = errorPayload.data.data.ERROR;
                vm.error = ERRORS_KEYS[error];
            }).finally(function () {
                vm.pending = false;
            })
        };

        vm.clearErrors = function () {
            vm.error = undefined;
        };

        vm.validateModel = function () {
            if(vm.model.username.trim() === '') {
                vm.error = ERRORS_KEYS.WRONG_USERNAME_OR_PASSWORD;
                return true;
            }
            if(vm.model.password.trim() === '') {
                vm.error = ERRORS_KEYS.WRONG_USERNAME_OR_PASSWORD;
                return true;
            }
            if(vm.model.password !== vm.model.matchingPassword) {
                vm.error = ERRORS_KEYS.PASSWORDS_DONT_MATCH;
                return true;
            }
            return false;
        }
    }

})();