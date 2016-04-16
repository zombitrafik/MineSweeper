(function () {
    angular
        .module('app')
        .service('animationService', animationService);

    animationService.$inject = ['pendingService', 'storageService', 'gameConfigService', 'customGetters'];

    function animationService (pendingService, storageService, gameConfigService, customGetters) {
        var service = {
            play: play,
            reset: reset,
            clearCellAnimation: clearCellAnimation,
            animations: {},
            init: init
        };

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        return service;

        function init () {
            animationStep();
        }

        function animationStep () {
            requestAnimationFrame(animationStep);
            for(var key in service.animations) {
                if(!service.animations.hasOwnProperty(key)) {continue;}

                var animation = service.animations[key];
                animation.draw((new Date()).getTime());
            }
        }

        function Animation (data, cb) {
            this.data = data;
            this.cb = cb;

            var x = data.x % data.cellsCount,
                y = data.y % data.cellsCount;
            var pointer = Object.keys(data.sprites)[0];
            var animSpeed = data.sprites[pointer].speed;

            var lastUpdateTime;

            this.stop = function () {
                delete service.animations[this.data.key];
            };

            this.draw = function (time) {
                if(animSpeed > time - lastUpdateTime ) {
                    return;
                } else {
                    lastUpdateTime = time;
                }
                data.ctx.putImageData(data.sprites[pointer], x * data.cellSize, y * data.cellSize);
                pointer = data.sprites[pointer].next;
                if(pointer === null) {
                    this.stop();
                    if( typeof cb === 'function') {
                        cb();
                    }
                }
            };
        }

        function play(type, cell, withoutAnimation, cb) {
            var data = getAnimationData(type, cell, cb);


            // ****
            if(withoutAnimation) {
                if( typeof cb === 'function') {
                    cb();
                }
            } else {
                service.animations[data.key] = new Animation(data, cb);
            }

            // ****
            return;


            if(pendingService.exist(data.key)) {
                var currentAnim = pendingService.get(data.key);
                if(canReplace(currentAnim.priority, data.priority)) {
                    clearInterval(currentAnim.interval);
                    pendingService.remove(data.key);
                } else {
                    return;
                }
            }
            var x = data.x % data.cellsCount,
                y = data.y % data.cellsCount;
            var pointer = Object.keys(data.sprites)[0];
            var animSpeed = data.sprites[pointer].speed;

            var interval = setInterval(function () {
                data.ctx.putImageData(data.sprites[pointer], x * data.cellSize, y * data.cellSize);
                pointer = data.sprites[pointer].next;
                if(pointer === null) {
                    clearInterval(interval);
                    pendingService.remove(data.key);
                    if( typeof data.callback === 'function') {
                        data.callback();
                    }
                }
            }, 1000 / animSpeed);

            pendingService.add(data.key, {
                interval: interval,
                priority: data.priority
            });
        }

        function getAnimationData (type, cell, cb) {
            var key = cell.x + '_' + cell.y;
            var sprites = storageService.sprites[type];
            var cellData = customGetters.getCellInCtx(cell.x, cell.y);
            return {
                ctx: cellData.ctx,
                x: cellData.x,
                y: cellData.y,
                sprites: sprites,

                cellSize: gameConfigService.FIELD.CELL.SIZE,
                cellsCount: gameConfigService.FIELD.CELLS_COUNT,
                priority: gameConfigService.SPRITES_PRIORITY[type],
                key: key,
                callback: cb
            };
        }

        function canReplace (exist, need) {
            return need > exist;
        }

        function reset () {
            pendingService.clear();
        }

        function clearCellAnimation (cell) {
            var key = cell.x + '_' + cell.y;
            delete service.animations[key];
        }
    }

})();