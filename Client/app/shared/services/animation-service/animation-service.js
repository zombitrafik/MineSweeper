(function () {
    angular
        .module('app')
        .service('animationService', animationService);

    animationService.$inject = ['pendingService', 'storageService', 'gameConfigService', 'customGetters'];

    function animationService (pendingService, storageService, gameConfigService, customGetters) {
        var service = {
            play: play
        };
        return service;

        function play(type, cell, cb) {
            var data = getAnimationData(type, cell, cb);

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
                    data.callback();
                    pendingService.remove(data.key);
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
    }

})();