(function () {
    angular
        .module('app')
        .controller('GameEndController', GameEndController);

    GameEndController.$inject = ['gameEndService'];

    function GameEndController (gameEndService) {
        var vm = this;

        vm.isOpen = function () {
            return gameEndService.isOpenDialog;
        };

        return vm;
    }
})();
