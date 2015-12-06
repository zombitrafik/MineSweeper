(function () {
    angular
        .module('app')
        .service('friendsApiService', friendsApiService);
    
    friendsApiService.$inject = ['Restangular'];
        
    function friendsApiService (Restangular) {
        var service = {
            search: search,
            getFriendsList: getFriendsList,
            addToFriend: addToFriend,
            removeFromFriend: removeFromFriend
        };
        return service;
        
        function search (model) {
            return Restangular.one('users').customGET('find', model);
        }

        function getFriendsList () {
            return Restangular.one('friends').customGET();
        }

        function addToFriend (username) {
            return Restangular.one('friends/add').customPOST({username: username});
        }

        function removeFromFriend (username) {
            return Restangular.one('friends/remove').customPOST({username: username});
        }
    }
})();