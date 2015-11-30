(function () {
    angular
        .module('app')
        .service('friendsService', friendsService);

    friendsService.$inject = ['friendsApiService', '$rootScope', '$q'];

    function friendsService (friendsApiService, $rootScope, $q) {
        var service = {
            toggleSearch: toggleSearch,
            isShowFriendsSearch: false,
            search: search,
            getFriendsList: getFriendsList,
            searchModel: {
                username: ''
            }
        };

        return service;

        function toggleSearch () {
            service.isShowFriendsSearch = !service.isShowFriendsSearch;
            if(!service.isShowFriendsSearch) {
                service.searchModel.username = '';
            }
        }

        function search () {
            var deferred = $q.defer();
            if(_.isEmpty(service.searchModel.username.trim())) {
                deferred.resolve();
            } else {
                friendsApiService.search(service.searchModel).then(function (response) {
                    deferred.resolve(response);
                }).catch(function () {
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

        function getFriendsList () {
            var deferred = $q.defer();
            friendsApiService.getFriendsList().then(function (response) {
                deferred.resolve(response);
            }).catch(function () {
                deferred.reject();
            });
            return deferred.promise;
        }
    }
})();