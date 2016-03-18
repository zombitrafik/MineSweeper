(function () {
    angular
        .module('app')
        .service('cacheService', cacheService);

    cacheService.$inject = ['$localForage', '$q'];

    function cacheService($localForage, $q) {
        var service = {
            item: item,
            clear: clear,
            remove: remove,
            local: [],
            init: init,
            isInit: false,
            clearService: clearService
        };
        return service;

        function init () {
            var deferred = $q.defer();
            if(!service.isInit) {
                $localForage.iterate(function(value, key) {
                    service.local[key] = value;
                }).then(function () {
                    service.isInit = true;
                    console.log('Iteration has completed');
                    deferred.resolve();
                }).catch(function () {
                    service.isInit = true;
                    console.log('CACHE SERVICE INIT ERROR');
                    deferred.reject();
                });
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }

        function addLocal (key, value) {
            service.local[key] = value;
        }

        function removeLocal (key) {
            service.local[key] = undefined;
        }

        function item(key, value, expire) {
            if (value) {
                var object = angular.copy(value);
                object = addExpire(object, expire);
                addLocal(key, object);
                return $localForage.setItem(key, object);
            } else {
                var deferred = $q.defer();
                $localForage.getItem(key).then(function (response) {
                    if (_.isNull(response) || isExpired(response)) {
                        $localForage.removeItem(key).finally(function () {
                            deferred.reject();
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
            service.local = [];
            return $localForage.clear();
        }

        function remove (key) {
            removeLocal(key);
            return $localForage.removeItem(key);
        }

        function clearService () {
            service.isInit = false;
            service.local = [];
        }
    }
})();