(function () {
    angular
       .module('app')
       .service('gameConfigService', gameConfigService);

    gameConfigService.$inject = [];

    function gameConfigService () {
        var service = {
            FIELD: {
                CELL: {
                    SIZE: 32
                }
            }
        };

        return service;
    }
})();
