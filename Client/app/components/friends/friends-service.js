(function () {
    angular
        .module('app')
        .service('friendsService', friendsService);

    friendsService.$inject = ['friendsApiService'];

    function friendsService (friendsApiService) {
        var service = {
            toggleSearch: toggleSearch,
            isShowFriendsSearch: false,
            search: search
        };
        return service;

        function toggleSearch () {
            service.isShowFriendsSearch = !service.isShowFriendsSearch;
        }

        function search (searchModel) {
            return friendsApiService.search(searchModel);
        }
    }
})();