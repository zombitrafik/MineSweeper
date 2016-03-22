(function () {
    'use strict';

    angular
        .module('app')
        .service('roomListService', roomListService);

    roomListService.$inject = ['roomListApiService', 'cacheService', '$q'];

    function roomListService (roomListApiService, cacheService, $q) {

        var rooms = [
            {
                id: 1,
                name: 'some name 1',
                players: {
                    length: 3
                },
                rating: 1200,
                started: true,
                time: (new Date())
            },{
                id: 2,
                name: 'some name 2',
                players: {
                    length: 5
                },
                rating: 730,
                started: true,
                time: (new Date())
            },{
                id: 3,
                name: 'some name 3',
                players: {
                    length: 4
                },
                rating: 2200,
                started: true,
                time: (new Date())
            }
        ];


        var service = {
            getRooms: getRooms,
            joinRoom: joinRoom,
            createRoom: createRoom,
            nextRoom: nextRoom,
            rooms: rooms,
            init: init
        };


        return service;

        function init () {

        }

        function getRooms () {
/*            var promise = roomListApiService.getRooms();
            promise.then(function (response) {
                service.rooms = response;
            });
            return promise;*/

            return rooms;
        }

        function joinRoom (id) {
            var deferred = $q.defer();
            cacheService.item(ROUTE_REQUIRES.ROOM, id).then(function () {
                deferred.resolve();
            }).catch(function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function nextRoom () {
            return roomListApiService.nextRoom();
        }

        function createRoom (config) {
            var deferred = $q.defer();
            var promise = roomListApiService.createRoom(config);
            promise.then(function (response) {
                cacheService.item(ROUTE_REQUIRES.ROOM, response.plain().id).then(function () {
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