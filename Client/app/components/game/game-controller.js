(function () {
    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['gameService', '$state'];

    function GameController (gameService, $state) {
        var vm = this;

        vm.leaveRoom = function () {
            gameService.leaveRoom().then(function () {
                $state.go('lobby');
            });
        };

        vm.init = function () {
            gameService.init();
        };

        return vm;
    }
})();
