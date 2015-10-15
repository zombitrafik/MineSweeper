(function () {
    angular
       .module('app')
       .service('gameConfigService', gameConfigService);

    gameConfigService.$inject = [];

    function gameConfigService () {
        var service = {
            FIELD: {
                CELL: {
                    SIZE: 32,
                    PADDING: 4
                },
                CELLS_COUNT: 10
            },
            SYMBOLS: {
                FLAG: -2,
                MINE: -1,
                EMPTY: 'E'
            },
            SPRITES: {
                closed: [
                    {x: 0, y: 96, step: 0, next: 1, speed: 100},
                    {x: 32, y: 96, step: 1, next: 2},
                    {x: 64, y: 96, step: 2, next: 3},
                    {x: 96, y: 96, step: 3, next: 4},
                    {x: 128, y: 96, step: 4, next: null}
                ],
                empty: [
                    {x: 0, y: 64}
                ],
                flag: [
                    {x: 64, y: 0}
                ],
                number: [
                    {x: 0, y: 0, value: 0},
                    {x: 0, y: 32, value: 1},
                    {x: 32, y: 32, value: 2},
                    {x: 64, y: 32, value: 3},
                    {x: 0, y: 32, value: 4},
                    {x: 0, y: 32, value: 5},
                    {x: 0, y: 32, value: 6},
                    {x: 0, y: 32, value: 7},
                    {x: 0, y: 32, value: 8}
                ],
                pending: [
                    {x: 0, y: 128, step: 0, next: 1, speed: 8},
                    {x: 32, y: 128, step: 1, next: 2},
                    {x: 64, y: 128, step: 2, next: 3},
                    {x: 96, y: 128, step: 3, next: 0}
                ]
            },
            SPRITE_KEYS: {
                closed: 'step',
                empty: null,
                flag: null,
                number: 'value',
                pending: 'step'
            }
        };

        return service;
    }
})();
