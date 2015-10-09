(function () {
    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameService', 'gameConfigService'];

    function GameController (gameService, gameConfigService) {
        
    }
})();
