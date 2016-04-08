(function () {
    'use strict';

    angular
        .module('app')
        .service('roomListService', roomListService);

    roomListService.$inject = ['roomListApiService', 'cacheService', '$q'];

    function roomListService (roomListApiService, cacheService, $q) {

        var service = {
            getRooms: getRooms,
            joinRoom: joinRoom,
            createRoom: createRoom,
            getRoom: getRoom,
            nextRoom: nextRoom,
            rooms: [],
            init: init,
            roomsPending: false
        };


        return service;

        function init () {
            getRooms();
        }

        function getRooms () {
            service.roomsPending = true;
            var promise = roomListApiService.getRooms();
            promise.then(function (response) {
                service.rooms = response;
            }).finally(function () {
                service.roomsPending = false;
            });
            return promise;
        }

        function joinRoom (id) {
            return roomListApiService.joinRoom(id);
        }

        function nextRoom () {
            return roomListApiService.nextRoom();
        }

        function createRoom (config) {
            var deferred = $q.defer();
            var promise = roomListApiService.createRoom(config);
            promise.then(function (response) {
                cacheService.item(ROUTE_REQUIRES.ROOM, response.plain().id).then(function () {
                    deferred.resolve(response.plain().id);
                }).catch(function () {
                    deferred.reject();
                })
            }).catch(function (response) {
                deferred.reject(response);
            });
            return deferred.promise;
        }

        function getRoom () {
            return roomListApiService.getRoom();
        }
    }
})();