(function () {
    'use strict';

    angular
        .module('app')
        .service('lobbyService', lobbyService);

    lobbyService.$inject = ['lobbyApiService', 'cacheService', '$q'];

    function lobbyService (lobbyApiService, cacheService, $q) {
        var service = {
            getRooms: getRooms,
            joinRoom: joinRoom,
            createRoom: createRoom
        };

        return service;

        function getRooms () {
            var promise = lobbyApiService.getRooms();
            promise.then(function (response) {
                service.rooms = response;
            });
            return promise;
        }

        function joinRoom (id) {
            var deferred = $q.defer();
            var promise = lobbyApiService.joinRoom(id);
            promise.then(function (response) {
                cacheService.item(ROUTE_REQUIRES.ROOM, response.plain()).then(function () {
                    deferred.resolve();
                }).catch(function () {
                    deferred.reject();
                });
            }).catch(function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function createRoom (config) {
            var deferred = $q.defer();
            var promise = lobbyApiService.createRoom(config);
            promise.then(function (response) {
                cacheService.item(ROUTE_REQUIRES.ROOM, response.plain()).then(function () {
                    deferred.resolve();
                }).catch(function () {
                    deferred.reject();
                })
            }).catch(function () {
                deferred.reject();
            });
            return deferred.promise;
        }
    }
})();