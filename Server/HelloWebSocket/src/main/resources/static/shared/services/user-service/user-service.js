(function () {
    angular
        .module('app')
        .service('userService', userService);
    
    userService.$inject = ['userApiService'];
        
    function userService (userApiService) {
        var service = {
            find: find
        };
        return service;
        
        function find (username) {
            return userApiService.find(username);
        }
    }
})();
