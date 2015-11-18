(function () {
    angular
        .module('app')
        .service('sessionService', sessionService);

    sessionService.$inject = ['$localForage', '$q', 'userApiService'];

    function sessionService ($localForage, $q, userApiService) {
        var service = {
            checkAuth: checkAuth
        };
        return service;

        function checkAuth (roles) {
            var deferred = $q.defer();
            if(!roles) {
                deferred.resolve();
            } else {
                userApiService.current().then(function (user) {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

    }
})();