(function () {
    angular
        .module('app')
        .service('registerApiService', registerApiService);

    registerApiService.$inject = ['Restangular'];

    function registerApiService (Restangular) {
        var service = {
            register: register
        };

        return service;

        function register (user) {
            return Restangular.one('newUser').customPOST(user);
        }

    }
})();