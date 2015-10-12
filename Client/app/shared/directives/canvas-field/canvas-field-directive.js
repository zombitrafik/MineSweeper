(function () {
    'use strict';

    angular
        .module('app')
        .directive('canvasField', canvasField);

    canvasField.$inject = ['gameConfigService', 'gameService', '$rootScope'];

    function canvasField (gameConfigService, gameService, $rootScope) {
        var directive = {
            restrict: 'A',
            scope: {
                data: '='
            },
            link: link
        };

        return directive;

        function link (scope, element, attrs) {
            var ctx = element[0].getContext('2d');
            var cellSize = gameConfigService.FIELD.CELL.SIZE;

            scope.render = function (data) {
                data = _.flatten(data);
                data.forEach(function (cell) {
                    drawCloseCell(cell.x, cell.y);
                });
            };

            function drawCloseCell (x, y) {
                ctx.fillStyle = 'gray';
                ctx.strokeStyle = 'silver';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }

            var canvas = angular.element(element[0]),
                offsetTop = canvas[0].offsetTop,
                offsetLeft = canvas[0].offsetLeft;
            canvas.on('click', function (e) {
                var coord = getCellCoord(e);
            });
            canvas.on('contextmenu', function (e) {
                var coord = getCellCoord(e);
            });

            function getCellCoord (e) {
                var x = e.clientX - offsetLeft,
                    y = e.clientY - offsetTop;
                x = Math.floor(x / cellSize);
                y = Math.floor(y / cellSize);
                return {
                    x: x,
                    y: y
                }
            }

            scope.$watch('data', function () {
                if(scope.data) {
                    scope.render(scope.data);
                }
            }, true);
        }
    }
})();