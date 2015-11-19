(function () {
    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['gameConfigService', 'canvasService', 'socketService', 'storageService', 'gameApiService', 'cacheService', '$q'];

    function gameService (gameConfigService, canvasService, socketService, storageService, gameApiService, cacheService, $q) {
        var service = {
            leaveRoom: leaveRoom,
            init: init,
            isInit: false
        };

        return service;

        function init () {

            cacheService.item(ROUTE_REQUIRES.ROOM).then(function (data) {

                var rows = data.game.mineField.width,
                    cols = data.game.mineField.height;
                generateMap(rows, cols);
                socketService.subscribe('/broker/rooms/'+data.id, canvasService.handleActions);

                cacheService.item('ROOM', data);

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
            cacheService.remove(ROUTE_REQUIRES.ROOM).finally(function () {
                gameApiService.leaveRoom().finally(function () {
                    deferred.resolve();
                });
            });
            var promise =
            return promise;
        }

    }
})();
