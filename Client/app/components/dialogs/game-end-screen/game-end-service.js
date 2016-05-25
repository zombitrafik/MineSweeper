(function () {
    angular
        .module('app')
        .service('gameEndService', gameEndService);

    gameEndService.$inject = ['roomListApiService'];

    function gameEndService (roomListApiService) {
        var service = {
            isOpenDialog: false,
            gameStatus: undefined,
            data: {},
            gameWin: gameWin,
            gameLose: gameLose,
            clearService: clearService,
            goNextRoom: goNextRoom
        };
        return service;

        function gameWin (data) {
            service.data = data;
            service.isOpenDialog = true;
        }

        function gameLose (data) {
            service.data = data;
            service.isOpenDialog = true;
        }

        function goNextRoom () {
            return roomListApiService.nextRoom();
        }

        function clearService () {
            service.data = {};
            service.isOpenDialog = false;
        }
    }
})();
