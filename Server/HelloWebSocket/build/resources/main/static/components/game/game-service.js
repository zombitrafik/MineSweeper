(function () {
    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['gameConfigService', 'canvasService', 'socketService', 'storageService', 'gameApiService', 'cacheService', '$q', 'gameEndScreenService', '$rootScope'];

    function gameService (gameConfigService, canvasService, socketService, storageService, gameApiService, cacheService, $q, gameEndScreenService, $rootScope) {
        var service = {
            leaveRoom: leaveRoom,
            init: init,
            isInit: false,
            socketPrefixes: {
                ROOM: 'ROOM_',
                GAMEEVENTS: 'GAMEEVENTS_'
            }
        };

        return service;

        function init () {
            var roomId = cacheService.local[ROUTE_REQUIRES.ROOM].data;
            gameEndScreenService.open = false;
            gameApiService.joinRoom(roomId).then(function (data) {

                var rows = data.game.mineField.width,
                    cols = data.game.mineField.height;
                generateMap(rows, cols);

                if(data.finished) {
                    showGameEndScreen();
                }

                var user = cacheService.local[ROUTE_REQUIRES.AUTH].data;

                var players = data.players;
                for(var i in players) {
                    if(players[i].username.toUpperCase() === user.username.toUpperCase()) {
                        if(players[i].bombed) {
                            canvasService.blockAllActions();
                        }
                        break;
                    }
                }

                socketService.connect('game').then(function () {
                    //socketService.subscribe('/user/broker/messages', handleSocket, service.socketPrefixes.MESSAGES + data.id);
                    socketService.subscribe('/broker/rooms/'+data.id, handleSocket, service.socketPrefixes.ROOM + data.id);
                    //socketService.subscribe('/broker/heartBeat', handleSocketHeartbeat, service.socketPrefixes.HEARTBEAT + data.id);
                    socketService.subscribe('/user/broker/game-events', handleSocket, service.socketPrefixes.GAMEEVENTS + data.id);
                });
                // subscribe


                canvasService.init('field').then(function () {
                    canvasService.handleActions(data.game.flags);
                    canvasService.handleActions(data.game.openedField);
                });
            });
        }

        function generateMap (rows, cols) {
            var map = [];
            for(var i = 0; i < rows; i++) {
                map[i] = [];
                for(var j = 0; j < cols; j++) {
                    map[i][j] = getCell(i, j);
                }
            }
            storageService.map = map;
            storageService.blocks = generateBlocks(map, gameConfigService.FIELD.CELLS_COUNT);

/*
            socketService.subscribe('test', function (data) {
                canvasService.handleActions(data);
            });*/
        }

        function generateBlocks (map, blockSize) {
            var blocks = [];
            var xBlocks = Math.ceil(map.length / blockSize),
                yBlocks = Math.ceil(map[0].length / blockSize);

            for(var i = 0; i < xBlocks; i++) {
                blocks[i] = [];
                for(var j = 0; j < yBlocks; j++) {
                    blocks[i][j] = getOneBlock(i, j, blockSize);
                }
            }
            return blocks;
        }

        function getOneBlock (x, y, blockSize) {
            var map = storageService.map;
            var i = x * blockSize,
                ie = i + blockSize,
                j = y * blockSize,
                je = j + blockSize;

            var block = [], rows = 0, cols = 0;
            for(; i < ie; i++) {
                if(!map[i]) break;
                block[rows] = [];
                for(; j < je; j++) {
                    if(!map[i][j]) break;
                    block[rows][cols] = map[i][j];
                    cols++;
                }
                j = y * blockSize;
                rows++;
                cols = 0;
            }
            return block;
        }

        function getCell (x, y) {
            return {
                x: x,
                y: y,
                value: -3
            }
        }

        function leaveRoom () {
            var deferred = $q.defer();

            var roomId = cacheService.local[ROUTE_REQUIRES.ROOM].data;

            socketService.unsubscribe(service.socketPrefixes, roomId);

            canvasService.unlockAllActions();
            cacheService.remove(ROUTE_REQUIRES.ROOM).finally(function () {
                gameApiService.leaveRoom().finally(function () {
                    deferred.resolve();
                });
            });
            return deferred.promise;
        }

        function showGameEndScreen () {
            gameEndScreenService.getStats().then(
                function () {
                    gameEndScreenService.open = true;
                    gameEndScreenService.leaveRoomMethod = leaveRoom;
                }
            );
        }

        function handleSocket (data) {

            switch (data.type) {
                case 'FIELD_UPDATE': {
                    canvasService.handleActions(data.data);
                    break;
                }
                case 'GAME_LOSE': {
                    console.log('lose');
                    showGameEndScreen();
                    $rootScope.$apply();
                    break;
                }
                case 'GAME_WIN' : {
                    console.log('win');
                    showGameEndScreen();
                    $rootScope.$apply();
                    break;
                }
                case 'PRIVATE_MESSAGE': {
                    console.log(data);
                    break;
                }
                case 'PLAYER_BOMBED' : {
                    canvasService.blockAllActions();
                    break;
                }
            }
        }

    }
})();