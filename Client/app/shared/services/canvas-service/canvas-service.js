(function () {
    angular
        .module('app')
        .service('canvasService', canvasService);

    canvasService.$inject = ['gameConfigService', 'eventHandlerService'];

    function canvasService (gameConfigService, eventHandlerService) {
        var service = {
            init: init,
            data: {},
            canvases: [],
            updateCells: updateCells
        };

        return service;

        function init (blocks, blockSize, selector) {
            service.data.blocks = blocks;
            service.data.selector = selector;

            service.canvases = createCanvases();
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
            var canvasElement = canvas.find('canvas');
            var ctx = canvasElement[0].getContext('2d');
            parent.append(canvas);
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
                redrawCell(coord.i, coord.j);
                eventHandlerService.openCell(coord)
            });
            canvas.on('contextmenu', function (e) {
                var coord = getCellCoord(e, offsetTop, offsetLeft);
                redrawCell(coord.i, coord.j);
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

        function redrawCell (i, j) {
            updateCells([
                {x: i, y: j, value: 1}
            ]);
        }

        function drawEmptyCell (ctx, x, y) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var cellPadding = gameConfigService.FIELD.CELL.PADDING;
            ctx.fillStyle = '#f8f8f8';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            drawTriangle(ctx, x * cellSize, y * cellSize, cellSize, cellSize, '#787878');
            ctx.fillStyle = '#b8b8b8';
            ctx.fillRect(x * cellSize + cellPadding, y * cellSize + cellPadding, cellSize - 2 * cellPadding, cellSize - 2 * cellPadding);
        }

        function drawTriangle(ctx, x, y, triangleWidth, triangleHeight, fillStyle){
            ctx.beginPath();
            ctx.moveTo(x + triangleWidth, y);
            ctx.lineTo(x, y + triangleHeight);
            ctx.lineTo(x + triangleWidth, y + triangleHeight);
            ctx.closePath();
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }

        function updateCells (data) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            var canvases = service.canvases;
            data.forEach(function (cell) {
                var coord = {i: cell.x, j: cell.y};
                var block = getBlockCoord(coord);
                var ctx = canvases[block.i][block.j];

                drawOpenedCell(ctx, coord.i % cellsCount, coord.j % cellsCount, cell.value);
            });
        }

        function drawOpenedCell (ctx, x, y, value) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            ctx.fillStyle = '#b8b8b8';
            ctx.strokeStyle = '#787878';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.font="20px Arial";
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

    }
})();
