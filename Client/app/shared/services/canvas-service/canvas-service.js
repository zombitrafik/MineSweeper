(function () {
    angular
        .module('app')
        .service('canvasService', canvasService);

    canvasService.$inject = ['gameConfigService', 'eventHandlerService', 'spriteService'];

    function canvasService (gameConfigService, eventHandlerService, spriteService) {
        var service = {
            init: init,
            data: {},
            canvases: [],
            updateCells: updateCells
        };

        return service;

        function init (map, blocks, blockSize, selector) {
            service.data.map = map;
            service.data.blocks = blocks;
            service.data.selector = selector;

            spriteService.Sprite('images/sprite.png').then(function (image) {
                spriteService.sprites = image.split(gameConfigService.SPRITES);
                service.canvases = createCanvases();
            });
        }

        function createCanvases () {
            var canvases = [];
            var parent = angular.element(document.querySelector('#' + service.data.selector));
            var blocks = service.data.blocks;
            for(var i = 0; i < blocks.length; i++) {
                canvases[i] = [];
                for(var j = 0; j < blocks[i].length; j++) {
                    canvases[i][j] = createCanvas(parent, i, j, blocks[i][j].length, blocks[i][j][0].length);
                }
            }
            return canvases;
        }

        function createCanvas (parent, i, j, width, height) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            var blockLength = cellSize * cellsCount;
            var canvas = angular.element('<div class="canvas" style="left: ' + (i * blockLength)  +'px;top: ' + (j * blockLength) +'px">' +
                '<canvas width="' + (width * cellSize) + '" height="' + (height*cellSize) +'"></canvas>' +
                '</div>');
            parent.append(canvas);

            var canvasElement = canvas.find('canvas');
            var ctx = canvasElement[0].getContext('2d');
            bindEvents(canvasElement);
            initEmptyCanvas(ctx);
            return ctx;
        }

        function bindEvents (canvas) {
            var offsetTop = canvas[0].offsetParent.offsetParent.offsetTop,
                offsetLeft = canvas[0].offsetParent.offsetParent.offsetLeft;

            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;

            canvas.on('click', function (e) {
                var coord = getCellCoord(e, offsetTop, offsetLeft);
                var value = getRandomInt(0, 8);

                if(!isValidCellToOpen(service.data.map[coord.j][coord.i].value)) return;
                updateCells([
                    {x: coord.i, y: coord.j, value: value}
                ]);
                service.data.map[coord.j][coord.i].value = value;
                eventHandlerService.openCell(coord)
            });
            canvas.on('contextmenu', function (e) {
                var coord = getCellCoord(e, offsetTop, offsetLeft);
                if(!isValidCellForFlag(service.data.map[coord.j][coord.i].value)) return;
                service.data.map[coord.j][coord.i].value = service.data.map[coord.j][coord.i].value === 'F'?'E':'F';
                redrawCell(coord.i, coord.j, service.data.map[coord.j][coord.i].value);
                window.navigator.vibrate(80);
                eventHandlerService.setFlag(coord)
            });

        }

        function getCellCoord (e, offsetTop, offsetLeft) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var x = e.pageX - offsetLeft,
                y = e.pageY - offsetTop;
            x = Math.floor(x / cellSize);
            y = Math.floor(y / cellSize);
            return {
                i: x,
                j: y
            }
        }

        function getBlockCoord (coord) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            return {
                i: Math.floor(coord.i / cellsCount),
                j: Math.floor(coord.j / cellsCount)
            }
        }

        function initEmptyCanvas(ctx) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;

            for(var i = 0; i < cellsCount; i++) {
                for(var j = 0; j < cellsCount; j++) {
                    drawEmptyCell(ctx, i, j);
                }
            }
        }

        function redrawCell (i, j, value) {
            updateCells([
                {x: i, y: j, value: value}
            ]);
        }

        function drawEmptyCell (ctx, x, y) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var image = spriteService.sprites['closed'][0];
            ctx.putImageData(image, x * cellSize, y * cellSize);
        }

        function drawFlagCell (ctx, x, y) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var image = spriteService.sprites['flag'][0];
            ctx.putImageData(image, x * cellSize, y * cellSize);
        }

        function updateCells (data) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            var canvases = service.canvases;
            data.forEach(function (cell) {
                var coord = {i: cell.x, j: cell.y};
                var block = getBlockCoord(coord);
                var ctx = canvases[block.i][block.j];
                service.data.map[coord.j][coord.i].value = cell.value;
                switch (cell.value) {
                    case 'F' : {
                        drawEmptyCell(ctx, coord.i % cellsCount, coord.j % cellsCount);
                        drawFlagCell(ctx, coord.i % cellsCount, coord.j % cellsCount);
                        break;
                    }
                    case 'E' : {
                        drawEmptyCell(ctx, coord.i % cellsCount, coord.j % cellsCount);
                        break;
                    }
                    default : {
                        drawOpenedCell(ctx, coord.i % cellsCount, coord.j % cellsCount, cell.value);
                    }
                }
            });
        }

        function drawOpenedCell (ctx, x, y, value) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            ctx.fillStyle = '#b8b8b8';
            ctx.strokeStyle = '#787878';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.font="bolder 20px Arial";
            ctx.fillStyle = getColorByValue(value);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            if(value === 0) {
                value = '';
            }
            ctx.fillText(value,x * cellSize + cellSize/ 2,y * cellSize + cellSize / 2);
        }


        function getColorByValue (value) {
            var color = 'blue';
            switch (value) {
                case 2: color = 'green'; break;
                case 3: color = 'red'; break;
                case 4: color = 'purple'; break;
                case 5: color = 'maroon'; break;
                case 6: color = 'turquoise'; break;
                case 7: color = 'black'; break;
                case 8: color = 'gray'; break;
            }
            return color;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function isValidCellToOpen (value) {
            return value !== 'F' && value !== 0;
        }

        function isValidCellForFlag (value) {
            return value === 'E' || value === 'F';
        }

    }
})();
