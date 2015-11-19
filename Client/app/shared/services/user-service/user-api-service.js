(function () {
    angular
        .module('app')
        .service('userApiService', userApiService);
    
    userApiService.$inject = ['Restangular'];
        
    function userApiService (Restangular) {
        var service = {
            current: current
        };
        return service;
        
        function current() {
            return Restangular.one('user').customGET();
        }
    }
})();