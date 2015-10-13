(function () {
    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['gameConfigService', 'eventHandlerService', 'canvasService', 'socketService'];

    function gameService (gameConfigService, eventHandlerService, canvasService, socketService) {
        var service = {
            generateMap: generateMap,
            map: [],
            blocks: []
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
            var blocks = generateBlocks(map, gameConfigService.FIELD.CELLS_COUNT);
            service.blocks = blocks;

            canvasService.init(blocks, gameConfigService.FIELD.CELL.SIZE, 'field');
            socketService.connect('http://localhost:9000/', function () {
               console.log('connect');
            });

            socketService.subscribe('test', function (data) {
                canvasService.updateCells(data);
            });
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
            var map = service.map;
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
                number: 'C'
            }
        }

    }
})();
