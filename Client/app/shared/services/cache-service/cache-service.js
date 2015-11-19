(function () {
    angular
        .module('app')
        .service('cacheService', cacheService);

    cacheService.$inject = ['$localForage', '$q'];

    function cacheService($localForage, $q) {
        var service = {
            item: item,
            clear: clear
        };
        return service;

        function item(key, value, expire) {
            if (value) {
                var object = angular.copy(value);
                object = addExpire(object, expire);
                return $localForage.setItem(key, object);
            } else {
                var deferred = $q.defer();
                $localForage.getItem(key).then(function (response) {
                    if (_.isNull(response) || isExpired(response)) {
                        $localForage.removeItem(key).finally(function () {
                            deferred.resolve(null);
                        });
                    } else {
                        deferred.resolve(response.data);
                    }
                }).catch(function () {
                    deferred.reject();
                });
                return deferred.promise;
            }
        }

        function isExpired(item) {
            var timestamp = item.timestamp;
            var expire = item.expire;
            var now = new Date().getTime();
            return expire === undefined ? false : timestamp + expire <= now;
        }

        function addExpire(item, expire) {
            var result = {
                data: item,
                timestamp: new Date().getTime(),
                expire: expire
            };
            return result;
        }

        function clear() {
            return $localForage.clear();
        }
    }
})();