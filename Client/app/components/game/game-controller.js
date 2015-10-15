(function () {
    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameService', 'gameConfigService'];

    function GameController (gameService, gameConfigService) {
        var vm = this;

        gameService.generateMap(15, 15);

        vm.getMap = function () {
            return  gameService.map;
        };

        return vm;
    }
})();
