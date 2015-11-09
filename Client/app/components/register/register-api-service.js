(function () {
    angular
        .module('app')
        .service('registerApiService', registerApiService);

    registerApiService.$inject = ['Restangular'];

    function registerApiService () {
        var service = {
            register: register
        };
        return service;

        function register (body) {
            return Restangular.one('newUser').customPOST(body);
        }
    }
})();