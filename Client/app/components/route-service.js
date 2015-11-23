(function () {
    angular
        .module('app')
        .service('routeService', routeService);

    routeService.$inject = ['$q', 'cacheService'];

    function routeService ($q, cacheService) {
        var service = {
            checkRoute: checkRoute,
            REQUIRES: {
                AUTH: 'AUTH',
                ROOM: 'ROOM'
            }
        };
        return service;

        function checkRoute (requires) {
            var deferred = $q.defer();
            console.log(cacheService.local);
            if(_.isEmpty(requires)) {
                deferred.resolve();
            } else {
                var requests = getRequests(requires, deferred.reject);
                $q.all(requests).then(function () {
                    deferred.resolve();
                });
            }
            return deferred.promise;
        }

        function getRequests (requires, parentReject) {
            var requests = [];
            requires.forEach(function (require) {
                var request = cacheService.item(require);
                request.then(function (response) {
                    if(_.isNull(response)) {
                        parentReject();
                    }
                }).catch(function () {
                    parentReject();
                });
                requests.push(request);
            });
            return requests;
        }
    }
})();