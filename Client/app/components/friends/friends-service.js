(function () {
    angular
        .module('app')
        .service('friendsService', friendsService);

    friendsService.$inject = [];

    function friendsService () {
        var service = {
            toggleSearch: toggleSearch,
            isShowFriendsSearch: false
        };
        return service;

        function toggleSearch () {
            service.isShowFriendsSearch = !service.isShowFriendsSearch;
        }
    }
})();