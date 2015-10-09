(function () {
    angular
        .module('app')
        .directive('field', fieldDirective);

    fieldDirective.$inject = ['gameConfigService', 'gameService', '$rootScope'];

    function fieldDirective (gameConfigService, gameSerivce, $rootScope) {
        var directive = {
            link: link,
            scope: {
                data: '=',
                selector: '='
            },
            restrict: 'E'
        };
        return directive;

        function link (scope, element, attrs) {

            element.append('<div id="'+scope.selector+'"></div>');

            var cellSize = gameConfigService.FIELD.CELL.SIZE;


            var svg = d3.select('#' + scope.selector)
                .append('svg')
                .attr('width', 300)
                .attr('height', 300);

            scope.render = function (data) {

                data = _.flatten(data);

                svg.selectAll('g').remove();

                var rects = svg.selectAll('g')
                    .data(data)
                    .enter()
                    .append('g')
                    .attr('transform', function (d) {
                        return 'translate(' + (d.x * cellSize) + ', ' + (d.y * cellSize) + ')';
                    });

                rects.append('rect')
                    .attr('width', cellSize)
                    .attr('height', cellSize)
                    .attr('class', function (d) {
                        return getClassByCellType(d.number);
                    })
                    .on('click', function (d) {
                        if(d.number === 'C') {
                            gameSerivce.open(d);
                            $rootScope.$apply();
                        }
                    })
                    .on('contextmenu', function (d) {
                        if(d.number === 'C') {
                            gameSerivce.setFlag(d);
                            $rootScope.$apply();
                        }
                    });

                rects.append('text')
                    .attr('y', 15)
                    .attr('x', 5)
                    .attr('class', function (d) {
                        if(d.number !== 'F' && d.number !== 'C' && d.number !== 0) {
                            return 'cell_text_' + d.number + ' cell_text';
                        }
                        return '';
                    })
                    .text(function (d) {
                        if(d.number === 'F') {
                            return 'F'
                        }
                        if(d.number === 'C' || d.number === 0) {
                            return '';
                        }
                        return d.number;
                    })

            };

            function getClassByCellType (type) {
                switch (type) {
                    case 'C': return 'rect closed';
                    case 'F': return 'rect flag';
                    case 0: return 'rect opened';
                }
                return 'rect opened';
            }

            scope.$watch('data', function () {
                if(scope.data) {
                    scope.render(scope.data);
                }
            }, true);
        }
    }
})();