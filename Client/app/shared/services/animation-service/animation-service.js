(function () {
    angular
        .module('app')
        .service('animationService', animationService);

    animationService.$inject = ['pendingService'];

    function animationService (pendingService) {
        var service = {
            play: play
        };
        return service;


        function play(data) {
            var key = data.i + '_' + data.j;
            if(pendingService.exist(data.key)) {
                var currentAnim = pendingService.get(data.key);
                if(canReplace(currentAnim.priority, data.priority)) {
                    clearInterval(currentAnim.interval);
                    pendingService.remove(data.key);
                } else {
                    return;
                }
            }
            var i = data.i % data.cellsCount,
                j = data.j % data.cellsCount;
            var pointer = Object.keys(data.sprites)[0];
            var animSpeed = data.sprites[pointer].speed;
            var cellSize = data.cellSize;
            var frame = 0;
            var interval = setInterval(function () {
                data.ctx.putImageData(data.sprites[pointer], i * cellSize, j * cellSize);
                pointer = data.sprites[pointer].next;
                if(pointer === null) {
                    clearInterval(interval);
                    data.callback();
                    pendingService.remove(data.key);
                }
                frame++;
                if(frame === data.maxFrames) {
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

        function canReplace (exist, need) {
            return need > exist;
        }
    }

})();