(function () {
    angular
        .module('app')
        .service('userApiService', userApiService);
    
    userApiService.$inject = ['Restangular'];
        
    function userApiService (Restangular) {
        var service = {
            current: current,
            find: find
        };
        return service;
        
        function current() {
            return Restangular.one('user').customGET();
        }

        function find (username) {
            return Restangular.one('users').customGET('find', {username: username});
        }
    }
})();