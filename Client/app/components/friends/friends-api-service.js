(function () {
    angular
        .module('app')
        .service('friendsApiService', friendsApiService);
    
    friendsApiService.$inject = ['Restangular'];
        
    function friendsApiService (Restangular) {
        var service = {
            search: search,
            getFriendsList: getFriendsList
        };
        return service;
        
        function search (model) {
            return Restangular.one('users').customGET('find', model);
        }

        function getFriendsList () {
            return Restangular.one('friends').customGET();
        }
    }
})();