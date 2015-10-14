(function () {
    angular
        .module('app')
        .service('canvasService', canvasService);

    canvasService.$inject = ['gameConfigService', 'eventHandlerService', 'spriteService'];

    function canvasService(gameConfigService, eventHandlerService, spriteService) {
        var service = {
            init: init,
            data: {},
            canvases: [],
            updateCells: updateCells
        };

        return service;

        function init(map, blocks, blockSize, selector) {
            service.data.map = map;
            service.data.blocks = blocks;
            service.data.selector = selector;

            spriteService.Sprite('images/sprites.png').then(function (image) {
                spriteService.sprites = image.split(gameConfigService.SPRITES, gameConfigService.SPRITE_KEYS);

                service.canvases = createCanvases();
            });
        }

        function createCanvases() {
            var canvases = [];
            var parent = angular.element(document.querySelector('#' + service.data.selector));
            var blocks = service.data.blocks;
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
            var offsetTop = canvas[0].offsetParent.offsetParent.offsetTop,
                offsetLeft = canvas[0].offsetParent.offsetParent.offsetLeft;

            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;

            canvas.on('click', function (e) {
                var coord = getCellCoord(e, offsetTop, offsetLeft);
                var value = getRandomInt(0, 8);

                if (!isValidCellToOpen(service.data.map[coord.j][coord.i].value)) return;
                updateCells([
                    {x: coord.i, y: coord.j, value: value}
                ]);
                service.data.map[coord.j][coord.i].value = value;
                eventHandlerService.openCell(coord);
               /* if(isEqualInterval(ctx, x, y)) {
                    removeInterval(ctx, x, y);
                    playAnimation(ctx, x, y, getImageDataByKey('closed'), function () {
                        ctx.putImageData(getImageByValue(value), x * cellSize, y * cellSize);
                    });
                } else {
                    var interval = playAnimation(ctx, x, y, getImageDataByKey('pending'));
                    addInterval(ctx, x, y, interval);
                }*/
            });
            canvas.on('contextmenu', function (e) {
                var coord = getCellCoord(e, offsetTop, offsetLeft);
                if (!isValidCellForFlag(service.data.map[coord.j][coord.i].value)) return;
                service.data.map[coord.j][coord.i].value = service.data.map[coord.j][coord.i].value === 'F' ? 'E' : 'F';
                redrawCell(coord.i, coord.j, service.data.map[coord.j][coord.i].value);
                window.navigator.vibrate(80);
                eventHandlerService.setFlag(coord);
            });

        }

        function getCellCoord(e, offsetTop, offsetLeft) {
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

        function getBlockCoord(coord) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            return {
                i: Math.floor(coord.i / cellsCount),
                j: Math.floor(coord.j / cellsCount)
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

        function redrawCell(i, j, value) {
            updateCells([
                {x: i, y: j, value: value}
            ]);
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
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            var canvases = service.canvases;
            data.forEach(function (cell) {
                var coord = {i: cell.x, j: cell.y};
                var block = getBlockCoord(coord);
                var ctx = canvases[block.i][block.j];
                service.data.map[coord.j][coord.i].value = cell.value;
                switch (cell.value) {
                    case 'F' :
                    {
                        drawFlagCell(ctx, coord.i % cellsCount, coord.j % cellsCount);
                        break;
                    }
                    case 'E' :
                    {
                        drawEmptyCell(ctx, coord.i % cellsCount, coord.j % cellsCount);
                        break;
                    }
                    default :
                    {
                        drawOpenedCell(ctx, coord.i % cellsCount, coord.j % cellsCount, cell.value);
                    }
                }
            });
        }

        function drawOpenedCell(ctx, x, y, value) {
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            if(isEqualInterval(ctx, x, y)) {
                removeInterval(ctx, x, y);
                playAnimation(ctx, x, y, getImageDataByKey('closed'), function () {
                    ctx.putImageData(getImageByValue(value), x * cellSize, y * cellSize);
                });
            } else {
                var interval = playAnimation(ctx, x, y, getImageDataByKey('pending'));
                addInterval(ctx, x, y, interval);
            }
        }

        function addInterval (ctx, x, y, interval) {
            ctx.intervals.push({
                interval: interval,
                x: x,
                y: y
            });
        }

        function isEqualInterval (ctx, x, y) {
            if(!_.isArray(ctx.intervals)) {
                ctx.intervals = [];
                return false;
            }
            for(var i in ctx.intervals) {
                var interval = ctx.intervals[i];
                if(interval.x === x && interval.y === y) {
                    return true;
                }
            }
            return false;
        }

        function removeInterval (ctx, x, y) {
            for(var i in ctx.intervals) {
                var interval = ctx.intervals[i];
                if(interval.x === x && interval.y === y) {
                    clearInterval(interval.interval);
                    break;
                }
            }
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

        function playAnimation(ctx, x, y, spritesData, cb, frameCountForBreak) {
            var pointer = Object.keys(spritesData)[0];
            var animSpeed = spritesData[pointer].speed;
            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var frame = 0;
            var interval = setInterval(function () {
                ctx.putImageData(spritesData[pointer], x * cellSize, y * cellSize);
                pointer = spritesData[pointer].next;
                if(pointer === null) {
                    clearInterval(interval);
                    cb();
                }
                frame++;
                if(frame === frameCountForBreak) {
                    clearInterval(interval);
                    cb();
                }
            }, 1000 / animSpeed);
            return interval;
        }

    }
})();
