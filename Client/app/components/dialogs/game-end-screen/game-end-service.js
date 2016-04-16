(function () {
    angular
        .module('app')
        .service('gameEndService', gameEndService);

    gameEndService.$inject = [];

    function gameEndService () {
        var service = {
            isOpenDialog: false,
            gameStatus: undefined,
            gameWin: gameWin,
            gameLose: gameLose
        };
        return service;

        function gameWin (data) {
            service.isOpenDialog = true;
        }

        function gameLose (data) {
            service.isOpenDialog = true;
        }

    }
})();
