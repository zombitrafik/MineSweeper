(function () {
    angular
        .module('app')
        .service('customGetters', customGetters);

    customGetters.$inject = ['gameConfigService', 'storageService'];

    function customGetters (gameConfigService, storageService) {
        var service = {
            getCellInCtx: getCellInCtx,
            getCell: getCell,
            getCanvas: getCanvas,
            getKey: getKey,
            getCoordByMouse: getCoordByMouse
        };

        return service;

        function getCellInCtx (x, y) {
            var canvas = getCanvas(x, y);
            return {
                ctx: canvas,
                y: parseInBlock(y),
                x: parseInBlock(x)
            };
        }

        function getKey(cell) {
            return cell.x + '_' + cell.y;
        }

        function getCanvas (i, j) {
            var canvases = storageService.canvases;
            return canvases[parseByBlock(i)][parseByBlock(j)];
        }

        function getCell (x, y) {
            var indexes = xyTOij(x, y);
            var map = storageService.map;
            return map[indexes.j][indexes.i];
        }

        function getCoordByMouse(e, canvas) {
            var offsetTop = canvas[0].offsetParent.offsetParent.offsetTop,
                offsetLeft = canvas[0].offsetParent.offsetParent.offsetLeft;

            var scrollLeft = e.srcElement.offsetParent.parentNode.scrollLeft,
                scrollTop = e.srcElement.offsetParent.parentNode.scrollTop;

            var cellSize = gameConfigService.FIELD.CELL.SIZE;
            var x = (e.pageX + scrollLeft) - offsetLeft,
                y = (e.pageY + scrollTop) - offsetTop;
            x = Math.floor(x / cellSize);
            y = Math.floor(y / cellSize);
            return {
                x: x,
                y: y
            }
        }

        //HELPERS

        function xyTOij (x, y) {
            return {
                i: y,
                j: x
            }
        }

        function ijTOxy (i, j) {
            return {
                x: j,
                y: i
            }
        }

        function parseInBlock (val) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            return val % cellsCount;
        }

        function parseByBlock (val) {
            var cellsCount = gameConfigService.FIELD.CELLS_COUNT;
            return Math.floor(val / cellsCount);
        }

    }
})();