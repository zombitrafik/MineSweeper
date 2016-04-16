(function () {
    angular
        .module('app')
        .service('lobbyService', lobbyService);

    lobbyService.$inject = ['$rootScope', 'roomListService', 'socketService', 'chatService', '$state', 'lobbyApiService', 'inviteService', 'gameApiService'];

    function lobbyService($rootScope, roomListService, socketService, chatService, $state, lobbyApiService, inviteService, gameApiService) {

        var EVENTS = {
            PLAYER_STATUS_UPDATE: 'PLAYER_STATUS_UPDATE',
            PLAYER_JOINED: 'PLAYER_JOINED',
            PLAYER_LEAVED: 'PLAYER_LEAVED',
            ROOM_MESSAGE: 'ROOM_MESSAGE',
            GAME_STARTED: 'GAME_STARTED',
            LEADER_CHANGED: 'LEADER_CHANGED',
            INVITE: 'INVITE'
        };

        var SOCKET_PREFIX = 'LOBBY';

        var service = {
            roomInfo: {},
            getCurrentRoom: getCurrentRoom,
            handleLobbyEvents: handleLobbyEvents,
            gameEventHandler: undefined,
            handleInvite: handleInvite,
            inviteUser: inviteUser,
            startGame: startGame
        };

        return service;


        function getCurrentRoom() {
            var promise = roomListService.getRoom();
            promise.then(function (response) {
                service.roomInfo = response;
                socketService.subscribe('/broker/rooms/' + service.roomInfo.id, handleLobbyEvents, SOCKET_PREFIX);
                if(service.roomInfo.started && !service.roomInfo.finished) {
                    $state.go('game');
                }
                if(service.roomInfo.finished) {
                    gameApiService.leaveRoom().finally(function () {
                        $state.go('room-list');
                    });
                }
            });
            return promise;
        }

        function handleLobbyEvents(response) {
            if(service.gameEventHandler) {
                service.gameEventHandler(response);
            }
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
                    console.log(userIndex);
                    if(userIndex > -1) {
                        service.roomInfo.players.splice(userIndex, 1);
                    }
                    console.log(service.roomInfo.players);
                    break;
                }
                case EVENTS.ROOM_MESSAGE: {
                    chatService.addLobbyMessage(response.data);
                    break;
                }
                case EVENTS.GAME_STARTED: {
                    $state.go('game');
                    break;
                }
                case EVENTS.LEADER_CHANGED: {
                    var user = _.find(service.roomInfo.players, function (player) {
                        return player.username == response.data.newLeader;
                    });
                    if(user) {
                        user.leader = true;
                    }
                    break;
                }
                default:
                {
                    break;
                }
            }
            $rootScope.$apply();
        }

        function handleInvite (response) {
            switch (response.type) {
                case EVENTS.INVITE: {
                    inviteService.addInvitation(response.data);
                    break;
                }
                default: {
                    break;
                }
            }
            $rootScope.$apply();
        }

        function inviteUser (username) {
            return lobbyApiService.inviteUser(username);
        }

        function startGame () {
            return lobbyApiService.startGame();
        }
    }
})();