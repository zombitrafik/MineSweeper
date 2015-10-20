(function () {
    angular
        .module('app')
        .controller('RegisterController', RegisterController)

    RegisterController.$inject = ['registerService', '$state'];

    function RegisterController (registerService, $state) {
        var vm = this;

        vm.user = {
            username: '',
            password: '',
            matchingPassword: ''
        };

        vm.register = function () {
            registerService.register(vm.user).then(function () {
                $state.go('login');
            });
        };

        vm.login = function () {
            $state.go('login');
        };
    }
})();