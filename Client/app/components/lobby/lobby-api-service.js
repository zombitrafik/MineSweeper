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

        var lobby = Restangular.all('lobby');

        return service;


        function getRooms () {
            return lobby.one('rooms').customGET();
        }

        function joinRoom (id) {
            return lobby.one('rooms', id).customPOST();
        }

        function createRoom () {
            return lobby.one('createRoom').customPOST();
        }
    }
})();