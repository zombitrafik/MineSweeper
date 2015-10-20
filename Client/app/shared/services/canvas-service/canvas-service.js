(function () {
    angular
        .module('app')
        .service('canvasService', canvasService);

    canvasService.$inject = ['gameConfigService', 'eventHandlerService', 'spriteService', 'animationService', 'storageService', 'customGetters', 'pendingService'];

    function canvasService(gameConfigService, eventHandlerService, spriteService, animationService, storageService, customGetters, pendingService) {
        var service = {
            init: init
        };

        return service;

        function init(selector) {
            storageService.selector = selector;

            spriteService.Sprite('images/sprites.png').then(function (image) {
                storageService.sprites = image.split(gameConfigService.SPRITES, gameConfigService.SPRITE_KEYS);

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
                actionManager(canvas, e);
                //clickEvent(canvas, e);
            });
            canvas.on('contextmenu', function (e) {
                actionManager(canvas, e);
                //contextMenuEvent(canvas, e);
            });
        }

        function initEmptyCanvas(ctx) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;

            for (var i = 0; i < cellsCount; i++) {
                for (var j = 0; j < cellsCount; j++) {
                    drawEmptyCell(ctx, i, j);
                }
            }
        }

        // drawnings block

        function drawEmptyCell(ctx, x, y) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var image = getImageDataByKey('explode_for_empty')[0];
            ctx.putImageData(image, x * cellSize, y * cellSize);
        }

        function drawFlagCell(ctx, x, y, cell) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var image = getImageDataByKey('flag')[0];
            animationService.play('explode_for_flag', cell, function () {
                ctx.putImageData(image, x * cellSize, y * cellSize);
            });
        }

        function drawOpenedCell(ctx, x, y, value, cell) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;

            animationService.play('explode_for_empty', cell, function () {
                ctx.putImageData(getImageByValue(value), x * cellSize, y * cellSize);
            });
        }

        function drawMineCell (cell) {
            animationService.play('mine', cell);
        }

        // end drawnings block

        function actionManager (canvas, e) {
            var actions = eventHandlerService.ACTIONS,
                coord = customGetters.getCoordByMouse(e, canvas),
                cell = customGetters.getCell(coord.x, coord.y);
            switch (e.type) {
                case actions.CLICK: {
                    clickActions(cell);
                    break;
                }
                case actions.CONTEXTMENU: {
                    contextmenuActions(cell);
                    window.navigator.vibrate(50);
                    break;
                }
            }
        }

        function clickActions (cell) {
            //open
            if(isValidForOpen(cell)) {
                eventHandlerService.openCell(cell);
                setTimeout(function () {
                    handleActions([
                        {x: cell.x, y: cell.y, value: getRandomInt(-1, 8)}
                    ]);
                }, 2000);
                animationService.play('click_left', cell, function () {
                    animationService.play('pending_open_one', cell);
                });

                return;
            }
            // click on opened cell
            if(isValidToOpenMore(cell)) {
                eventHandlerService.openCell(cell);
            }
        }

        function contextmenuActions (cell) {
            //set flag state
            if(isValidForFlag(cell)) {
                eventHandlerService.setFlag(cell);
                setTimeout(function () {
                    handleActions([
                        {x: cell.x, y: cell.y, value: -2}
                    ]);
                }, 2000);
                animationService.play('click_right', cell, function () {
                    animationService.play('pending_flag', cell);
                });
                return;
            }
        }

        function handleActions (data) {
            data.forEach(function (cell) {
                var cellData = customGetters.getCellInCtx(cell.x, cell.y);
                var symbols = gameConfigService.SYMBOLS;
                var previosCellValue = customGetters.getCell(cell.x, cell.y).value;
                if(previosCellValue === cell.value) {
                    //cell not changed
                    return;
                }
                switch (cell.value) {
                    case symbols.FLAG:
                    {
                        drawFlagCell(cellData.ctx, cellData.x, cellData.y, cell);
                        break;
                    }
                    case symbols.EMPTY:
                    {
                        drawEmptyCell(cellData.ctx, cellData.x, cellData.y);
                        break;
                    }
                    case symbols.MINE: {
                        drawMineCell(cell);
                        break;
                    }
                    default:
                    {
                        drawOpenedCell(cellData.ctx, cellData.x, cellData.y, cell.value, cell);
                    }
                }
            });

            updateModel(data);
        }

        function isValidForOpen(cell) {
            var key = customGetters.getKey(cell);
            var empty = gameConfigService.SYMBOLS.EMPTY;
            return (cell.value === empty && !pendingService.exist(key));
        }

        function isValidForFlag(cell) {
            var key = customGetters.getKey(cell);
            var flag = gameConfigService.SYMBOLS.FLAG,
                empty = gameConfigService.SYMBOLS.EMPTY;
            return (cell.value === flag || cell.value === empty) && !pendingService.exist(key);
        }

        function isValidToOpenMore (cell) {
            var key = customGetters.getKey(cell);
            var value = parseInt(cell.value);
            return (value > 0 && value <= 8) && !pendingService.exist(key);
        }

        function updateModel (data) {
            data.forEach(function (cell) {
                storageService.map[cell.x][cell.y].value = cell.value;
            });
        }

        function getImageByValue(value) {
            return getImageDataByKey('number')[value];
        }

        function getImageDataByKey(key) {
            return storageService.sprites[key];
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
})();