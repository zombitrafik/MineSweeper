(function () {
    angular
        .module('app')
        .service('friendsApiService', friendsApiService);
    
    friendsApiService.$inject = ['Restangular'];
        
    function friendsApiService (Restangular) {
        var service = {
            search: search
        };
        return service;
        
        function search (model) {
            return Restangular.one('users').customGET('find', model);
        }
    }
})();