(function () {
    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameService', 'gameConfigService'];

    function GameController (gameService, gameConfigService) {
        var vm = this;

        gameService.generateMap(30, 30);

        vm.getMap = function () {
            return  gameService.map;
        };

        return vm;
    }
})();
