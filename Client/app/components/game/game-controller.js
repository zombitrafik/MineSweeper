(function () {
    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameService', 'gameConfigService'];

    function GameController (gameService, gameConfigService) {
        var vm = this;

        vm.selector = 'game';

        gameService.generateMap(10, 10);

        vm.getMap = function () {
            return  gameService.map;
        };

        return vm;
    }
})();
