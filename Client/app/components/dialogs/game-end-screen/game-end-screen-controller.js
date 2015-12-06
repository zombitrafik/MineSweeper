(function () {
    angular
        .module('app')
        .controller('GameEndScreenController', GameEndScreenController);

    GameEndScreenController.$inject = ['gameEndScreenService', '$state'];

    function GameEndScreenController (gameEndScreenService, $state) {
        var vm = this;

        vm.isOpen = function () {
            return gameEndScreenService.open;
        };

        vm.leave = function () {
            gameEndScreenService.leaveRoomMethod().then(function () {
                $state.go('lobby');
            })
        };

        vm.nextGame = function () {
            gameEndScreenService.nextRoom().then(function () {
                gameEndScreenService.open = false;
                $state.reload();
            });
        };

        vm.getStats = function () {
            return gameEndScreenService.stats;
        };

        return vm;
    }
})();