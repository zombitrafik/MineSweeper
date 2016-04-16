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
                CELLS_COUNT: 64
            },
            SYMBOLS: {
                FLAG: -2,
                MINE: -1,
                EMPTY: -3
            },
            SPRITES: {
                closed: [
                    {x: 0, y: 64, step: 0, next: 1, speed: 1000/60 },
                    {x: 96, y: 96, step: 1, next: 2},
                    {x: 32, y: 96, step: 2, next: 3},
                    {x: 64, y: 96, step: 3, next: 4},
                    {x: 96, y: 96, step: 4, next: 5},
                    {x: 128, y: 96, step: 5, next: 6},
                    {x: 160, y: 96, step: 6, next: null}
                ],
                closed_one: [
                    {x: 0, y: 64}
                ],
                empty: [
                    {x: 32, y: 64}
                ],
                flag: [
                    {x: 0, y: 192}
                ],
                number: [
                    {x: 32, y: 64, value: 0},
                    {x: 0, y: 0, value: 1},
                    {x: 32, y: 0, value: 2},
                    {x: 64, y: 0, value: 3},
                    {x: 96, y: 0, value: 4},
                    {x: 128, y: 0, value: 5},
                    {x: 160, y: 0, value: 6},
                    {x: 192, y: 0, value: 7},
                    {x: 224, y: 0, value: 8}
                ],
                pending_open_one: [
                    {x: 0, y: 128, step: 0, next: 1, speed: 1000/10 },
                    {x: 32, y: 128, step: 1, next: 2},
                    {x: 64, y: 128, step: 2, next: 3},
                    {x: 96, y: 128, step: 3, next: 0}
                ],
                pending_flag: [
                    {x: 0, y: 160, step: 0, next: 1, speed: 1000/10 },
                    {x: 32, y: 160, step: 1, next: 2},
                    {x: 64, y: 160, step: 2, next: 3},
                    {x: 96, y: 160, step: 3, next: 0}
                ],
                mine: [
                    {x: 0, y: 32, step: 0, next: 1, speed: 20},
                    {x: 32, y: 32, step: 1, next: 2},
                    {x: 0, y: 32, step: 2, next: 3},
                    {x: 32, y: 32, step: 3, next: 4},
                    {x: 0, y: 32, step: 4, next: 5},
                    {x: 32, y: 32, step: 5, next: null}
                ],
                click_left: [
                    {x: 128, y: 128, step: 0, next: 1, speed: 1000/10},
                    {x: 128, y: 128, step: 1, next: null}
                ],
                click_right: [
                    {x: 128, y: 160, step: 0, next: 1, speed: 1000/10},
                    {x: 128, y: 160, step: 1, next: null}
                ]
            },
            SPRITE_KEYS: {
                closed: 'step',
                closed_one: null,
                empty: null,
                flag: null,
                number: 'value',
                pending_open_one: 'step',
                pending_flag: 'step',
                mine: 'step',
                click_left: 'step',
                click_right: 'step'
            },
            SPRITES_PRIORITY: {
                closed: 3,
                closed_one: 3,
                empty: 0,
                flag: 3,
                number: 3,
                pending_open_one: 2,
                pending_flag: 2,
                mine: 3,
                click_left: 1,
                click_right: 1
            }
        };

        return service;
    }
})();
