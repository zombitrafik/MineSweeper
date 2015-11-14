(function () {
    'use strict';

    angular
        .module('app')
        .service('lobbyService', lobbyService);

    lobbyService.$inject = ['lobbyApiService', 'socketService', 'gameService', '$q'];

    function lobbyService (lobbyApiService, socketService, gameService, $q) {
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
            var promise = lobbyApiService.joinRoom(id);
            promise.then(function (response) {
                gameService.init(response);
            });
            return promise;
        }

        function createRoom (config) {
            var promise = lobbyApiService.createRoom(config);
            promise.then(function (response) {
                gameService.init(response);
            });
            return promise;
        }
    }
})();