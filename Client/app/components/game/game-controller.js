(function () {
    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameService', '$state'];

    function GameController (gameService, $state) {
        var vm = this;

        vm.getMap = function () {
            return  gameService.map;
        };

        vm.leaveRoom = function () {
            gameService.leaveRoom().then(function () {
                $state.go('lobby');
            });
        };

        return vm;
    }
})();
