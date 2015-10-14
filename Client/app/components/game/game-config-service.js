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
            SPRITES: {
                closed: [
                    {x: 32, y: 0}
                ],
                empty: [
                    {x: 0, y: 0}
                ],
                flag: [
                    {x: 64, y: 0}
                ],
                number: [
                    {value: 0},
                ]
            }
        };

        return service;
    }
})();
