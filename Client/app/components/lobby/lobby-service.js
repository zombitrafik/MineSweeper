(function () {
    'use strict';

    angular
        .module('app')
        .service('lobbyService', lobbyService);

    lobbyService.$inject = ['lobbyApiService', 'gameService', 'eventHandlerService'];

    function lobbyService (lobbyApiService, gameService, eventHandlerService) {
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
                eventHandlerService.init(response);
            });
            return promise;
        }

        function createRoom () {
            var promise = lobbyApiService.createRoom();
            promise.then(function (response) {
                eventHandlerService.init(response);
            });
            return promise;
        }
    }
})();