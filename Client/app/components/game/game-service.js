(function () {
    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['gameConfigService'];

    function gameService (gameConfigService) {

    }
})();
