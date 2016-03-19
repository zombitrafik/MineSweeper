(function () {
    'use strict';

    angular
        .module('app')
        .service('roomListApiService', roomListApiService);

    roomListApiService.$inject = ['Restangular'];

    function roomListApiService (Restangular) {
        var service = {
            getRooms: getRooms,
            joinRoom: joinRoom,
            createRoom: createRoom,
            nextRoom: nextRoom
        };

        return service;


        function getRooms () {
            return Restangular.one('rooms').customGET();
        }

        function joinRoom (id) {
            return Restangular.one('rooms', id).customPOST();
        }

        function createRoom (config) {
            return Restangular.one('rooms/create').customPOST(config);
        }

        function nextRoom () {
            return Restangular.one('rooms/next').customPOST();
        }
    }
})();