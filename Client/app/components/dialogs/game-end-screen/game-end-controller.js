(function () {
    angular
        .module('app')
        .controller('GameEndController', GameEndController);

    GameEndController.$inject = ['gameEndService', 'roomListApiService', '$state', 'gameApiService'];

    function GameEndController (gameEndService, roomListApiService, $state, gameApiService) {
        var vm = this;

        vm.pending = false;

        vm.isOpen = function () {
            return gameEndService.isOpenDialog;
        };

        vm.goNextRoom = function () {
            vm.pending = true;
            gameEndService.goNextRoom().then(function (id) {
                leaveRoom(id);
            }).finally(function () {
                gameEndService.clearService();
                vm.pending = false;
            });
        };

        function leaveRoom (id) {
            gameApiService.leaveRoom().finally(function () {
                joinRoom(id);
            });
        }

        function joinRoom (id) {
            roomListApiService.joinRoom(id).then(function () {
                $state.go('lobby', {id: id});
            }).finally(function () {
                vm.pending = false;
            });
        }

        vm.exit = function () {
            gameApiService.leaveRoom().finally(function () {
                $state.go('room-list');
                gameEndService.clearService();
            });
        };

        vm.getData = function () {
            return gameEndService.data;
        };

        return vm;
    }
})();
