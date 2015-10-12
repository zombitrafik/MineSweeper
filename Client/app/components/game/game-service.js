(function () {
    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['gameConfigService', 'gameApiService'];

    function gameService (gameConfigService, gameApiService) {
        var service = {
            generateMap: generateMap,
            updateMap: updateMap,
            setFlag: setFlag,
            open: open,
            map: [],
            setRoom: setRoom
        };

        return service;

        function generateMap (rows, cols) {
            var map = [];
            for(var i = 0; i < rows; i++) {
                map[i] = [];
                for(var j = 0; j < cols; j++) {
                    map[i][j] = getCell(i, j);
                }
            }
            service.map = map;
            generateBlocks(map, 20);
            return map;
        }

        function generateBlocks (map, blockSize) {
            var blocks = [];
            var xBlocks = Math.ceil(map.length / blockSize),
                yBlocks = Math.ceil(map[0].length / blockSize);

            for(var i = 0; i < xBlocks; i++) {
                for(var j = 0; j < yBlocks; j++) {
                    getOneBlock(i, j, blockSize);
                }
            }
        }

        function getOneBlock (x, y, blockSize) {
            var map = service.map;
            var i = x * blockSize,
                ie = i + blockSize,
                j = y * blockSize,
                je = j + blockSize;

            var block = [], rows = 0, cols = 0;
            for(; i < ie; i++) {
                block[rows] = [];
                if(!map[i]) break;
                for(; j < je; j++) {
                    if(!map[i][j]) break;
                    block[rows][cols] = map[i][j];
                    cols++;
                }
                j = y * blockSize;
                rows++;
                cols = 0;
            }
            console.log(block);
        }

        function getCell (x, y) {
            return {
                x: x,
                y: y,
                number: 'C'
            }
        }

        function updateMap (data) {
            var map = service.map;
            data.forEach(function (cell) {
                map[cell.x][cell.y].number = cell.value;
            });
        }

        function setFlag (cell) {
            var data = {x: cell.x, y: cell.y};
            var roomId = service.room.id;
            gameApiService.setFlag(data, roomId).then(function (response) {

            });
        }

        function open (cell) {
            var data =  [{x: cell.x, y: cell.y, number: 'F'}];
            updateMap(data);
            var roomId = service.room.id;
            gameApiService.openCell(data, roomId).then(function (response) {
                updateMap(response);
            });
        }

        function setRoom (room) {
            service.room = room;
            var field = service.room.mineField;
            generateMap(field.width, field.height);
            updateMap(field.openedField);
        }
    }
})();
