(function () {
    'use strict';

    angular
        .module('app')
        .service('lobbyApiService', lobbyApiService);

    lobbyApiService.$inject = ['Restangular'];

    function lobbyApiService (Restangular) {
        var service = {
            getRooms: getRooms,
            joinRoom: joinRoom,
            createRoom: createRoom
        };

        var rooms = Restangular.all('rooms');

        return service;


        function getRooms () {
            return Restangular.one('rooms').customGET();
        }

        function joinRoom (id) {
            return Restangular.one('rooms', id).customPOST();
        }

        function createRoom () {
            return rooms.one('create').customPOST();
        }
    }
})();