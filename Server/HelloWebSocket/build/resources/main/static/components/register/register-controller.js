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

        vm.errors = {};

        vm.login = function () {
            $state.go('login');
        };

        vm.register = function () {
            vm.clearErrors();
            if(vm.validateModel()) {
                return;
            }
            registerService.register(vm.model).then(function () {
                $state.go('login');
            }).catch(function () {
                vm.errors.username = 'Such user already exist';
            });
        };

        vm.clearErrors = function () {
            vm.errors = {};
        };

        vm.validateModel = function () {
            var hasError = false;
            if(vm.model.username.trim() === '') {
                hasError = true;
                vm.errors.username = 'Username is required';
            }
            if(vm.model.username.trim().length < 6) {
                hasError = true;
                vm.errors.username = 'Username is to short';
            }
            if(vm.model.password.trim() === '') {
                hasError = true;
                vm.errors.password = 'Password is required';
            }
            if(vm.model.password.trim().length < 6) {
                hasError = true;
                vm.errors.password = 'Password is too short';
            }
            if(vm.model.password !== vm.model.matchingPassword) {
                hasError = true;
                vm.errors.password = 'Passwords does not match';
                vm.errors.matchingPassword = 'Passwords does not match';
            }

            return hasError;
        }
    }

})();