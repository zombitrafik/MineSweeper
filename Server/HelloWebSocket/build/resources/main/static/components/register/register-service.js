(function () {
    angular
        .module('app')
        .service('registerService', registerService);
    
    registerService.$inject = ['registerApiService'];
        
    function registerService (registerApiService) {
        var service = {
            register: register
        };
        return service;

        function register (user) {
            return registerApiService.register(user);
        }
        
    }
})();