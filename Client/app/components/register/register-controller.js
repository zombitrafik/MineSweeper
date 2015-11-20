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

        vm.login = function () {
            $state.go('login');
        };

        vm.register = function () {
            registerService.register(vm.model).then(function () {
                $state.go('login');
            });
        };
    }

})();