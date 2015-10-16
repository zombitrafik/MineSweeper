(function () {
    angular
        .module('app')
        .service('canvasService', canvasService);

    canvasService.$inject = ['gameConfigService', 'eventHandlerService', 'spriteService', 'animationService', 'storageService'];

    function canvasService(gameConfigService, eventHandlerService, spriteService, animationService, storageService) {
        var service = {
            init: init,
            data: {},
            canvases: [],
            updateCells: updateCells
        };

        return service;

        function init(map, blocks, blockSize, selector) {
            storageService.map = map;
            storageService.blocks = blocks;
            storageService.selector = selector;

            spriteService.Sprite('images/sprites.png').then(function (image) {
                spriteService.sprites = image.split(gameConfigService.SPRITES, gameConfigService.SPRITE_KEYS);

                storageService.canvases = createCanvases();
            });
        }

        function createCanvases() {
            var canvases = [];
            var parent = angular.element(document.querySelector('#' + storageService.selector));
            var blocks = storageService.blocks;
            for (var i = 0; i < blocks.length; i++) {
                canvases[i] = [];
                for (var j = 0; j < blocks[i].length; j++) {
                    canvases[i][j] = createCanvas(parent, i, j, blocks[i][j].length, blocks[i][j][0].length);
                }
            }
            return canvases;
        }

        function createCanvas(parent, i, j, width, height) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            var blockLength = cellSize * cellsCount;
            var canvas = angular.element('<div class="canvas" style="left: ' + (i * blockLength) + 'px;top: ' + (j * blockLength) + 'px">' +
                '<canvas width="' + (width * cellSize) + '" height="' + (height * cellSize) + '"></canvas>' +
                '</div>');
            parent.append(canvas);

            var canvasElement = canvas.find('canvas');
            var ctx = canvasElement[0].getContext('2d');
            bindEvents(canvasElement);
            initEmptyCanvas(ctx);
            return ctx;
        }

        function bindEvents(canvas) {
            canvas.on('click', function (e) {
                clickEvent(canvas, e);
            });
            canvas.on('contextmenu', function (e) {
                contextMenuEvent(canvas, e);
            });
        }

        function clickEvent(canvas, e) {
            var coord = getCellCoord(e, canvas);
            var cell = storageService.map[coord.j][coord.i];
            actionManager(cell, e.type);
        }

        function contextMenuEvent(canvas, e) {
            var coord = getCellCoord(e, canvas);
            var cell = storageService.map[coord.j][coord.i];
            actionManager(cell, e.type);
        }

        function getCellCoord(e, canvas) {
            var offsetTop = canvas[0].offsetParent.offsetParent.offsetTop,
                offsetLeft = canvas[0].offsetParent.offsetParent.offsetLeft;

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

        function getBlockCoord(x, y) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            return {
                x: Math.floor(x / cellsCount),
                y: Math.floor(y / cellsCount)
            }
        }

        function initEmptyCanvas(ctx) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;

            for (var i = 0; i < cellsCount; i++) {
                for (var j = 0; j < cellsCount; j++) {
                    drawEmptyCell(ctx, i, j);
                }
            }
        }

        function drawEmptyCell(ctx, x, y) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var image = spriteService.sprites['closed'][0];
            ctx.putImageData(image, x * cellSize, y * cellSize);
        }

        function drawFlagCell(ctx, x, y) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var image = spriteService.sprites['flag'][0];
            ctx.putImageData(image, x * cellSize, y * cellSize);
        }

        function updateCells(data) {
            data.forEach(function (cell) {
                var cellData = getCellInCtx(cell.x, cell.y);
                console.log(cell.x, cell.y, cellData);
                switch (cell.value) {
                    case -2:
                    {
                        drawFlagCell(cellData.ctx, cellData.x, cellData.y);
                        break;
                    }
                    case 'E':
                    {
                        drawEmptyCell(cellData.ctx, cellData.x, cellData.y);
                        break;
                    }
                    default :
                    {
                        drawOpenedCell(cellData.ctx, cellData.x, cellData.y, cell.value);
                    }
                }
            });
        }

        function actionManager (cell, action) {
            var actions = eventHandlerService.ACTIONS;
            switch (action) {
                case actions.CLICK: {
                    clickActions(cell);
                    break;
                }
                case actions.CONTEXTMENU: {
                    contextmenuActions(cell);
                    break;
                }
            }
        }

        function clickActions (cell) {
            //open
            if(isValidForOpen(cell)) {
                eventHandlerService.openCell(cell);

                animationService.play('pending', cell);

                // TEST DATA
                setTimeout(function () {

                    updateCells([{
                        x: cell.x,
                        y: cell.y,
                        value: 1
                    }]);
                    updateModel([{
                        x: cell.x,
                        y: cell.y,
                        value: 1
                    }]);

                }, 2000);

                return;
            }
            // click on opened cell
            if(isValidToOpenMore(cell)) {

            }
        }

        function contextmenuActions (cell) {
            //set flag state
            if(isValidForFlag(cell)) {
                eventHandlerService.setFlag(cell);
                updateCells([{
                    x: cell.x,
                    y: cell.y,
                    value: -2
                }]);
                updateModel([{
                    x: cell.x,
                    y: cell.y,
                    value: -2
                }]);
            }
        }

        function isValidForOpen(cell) {
            //TODO check pendings
            var empty = gameConfigService.SYMBOLS.EMPTY;
            return cell.value === empty;
        }

        function isValidForFlag(cell) {
            //TODO check pendings
            var flag = gameConfigService.SYMBOLS.FLAG,
                empty = gameConfigService.SYMBOLS.EMPTY;
            return (cell.value === flag || cell.value === empty)
        }

        function isValidToOpenMore (cell) {
            //TODO check pendings
            var map = storageService.map;
            var model = map[cell.y][cell.x];
            var value = parseInt(model.value);
            return (value >= 0 && value <= 8);
        }

        function updateModel (data) {
            data.forEach(function (cell) {
                storageService.map[cell.x][cell.y].value = cell.value;
            });
        }

        function getCellInCtx (x, y) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            var canvases = storageService.canvases;
            var block = getBlockCoord(x, y);
            return {
                ctx: canvases[block.y][block.x],
                y: x % cellsCount,
                x: y % cellsCount
            };
        }

        function drawOpenedCell(ctx, x, y, value) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            animationService.play({
                ctx: ctx,
                i: x,
                j: y,
                sprites: getImageDataByKey('closed'),
                cellSize: gameConfigService.FIELD.CELL.SIZE,
                cellsCount: gameConfigService.FIELD.CELLS_COUNT,
                callback: function () {
                    ctx.putImageData(getImageByValue(value), x * cellSize, y * cellSize);
                },
                priority: 3
            });
            /*playAnimation(ctx, x, y, getImageDataByKey('closed'), function () {
                ctx.putImageData(getImageByValue(value), x * cellSize, y * cellSize);
            });*/
        }

        function getImageByValue(value) {
            return getImageDataByKey('number')[value];
        }

        function getImageDataByKey(key) {
            return spriteService.sprites[key];
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function isValidCellToOpen(value) {
            return value !== 'F' && value !== 0;
        }

        function isValidCellForFlag(value) {
            return value === 'E' || value === 'F';
        }
    }
})();
