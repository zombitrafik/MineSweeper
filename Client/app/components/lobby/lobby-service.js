(function () {
    angular
        .module('app')
        .service('lobbyService', lobbyService);

    lobbyService.$inject = ['lobbyApiService', 'roomListService', 'socketService'];

    function lobbyService(lobbyApiService, roomListService, socketService) {

        var EVENTS = {
            PLAYER_STATUS_UPDATE: 'PLAYER_STATUS_UPDATE',
            PLAYER_JOINED: 'PLAYER_JOINED',
            PLAYER_LEAVED: 'PLAYER_LEAVED'
        };

        var SOCKET_PREFIX = 'LOBBY';

        var service = {
            roomInfo: {},
            getCurrentRoom: getCurrentRoom,
            handleLobbyEvents: handleLobbyEvents
        };

        return service;


        function getCurrentRoom() {
            roomListService.getRoom().then(function (response) {
                service.roomInfo = response;
                socketService.subscribe('/broker/rooms/' + service.roomInfo.id, handleLobbyEvents, SOCKET_PREFIX);
            });
        }

        function handleLobbyEvents(response) {
            switch (response.type) {
                case EVENTS.PLAYER_JOINED:
                {
                    var isNewUser = _.find(service.roomInfo.players, function (player) {
                            return player.username == response.data.username;
                        }) === undefined;
                    if (isNewUser) {
                        service.roomInfo.players.push(response.data);
                    }
                    break;
                }
                case EVENTS.PLAYER_LEAVED:
                {
                    var userIndex = _.findIndex(service.roomInfo.players, function (player) {
                        return player.username == response.data.username;
                    });
                    if(userIndex > -1) {
                        service.roomInfo.players.splice(userIndex, 1);
                    }
                    break;
                }
                default:
                {
                    break;
                }
            }
        }
    }
})();