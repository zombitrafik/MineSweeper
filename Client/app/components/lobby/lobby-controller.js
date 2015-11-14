(function () {
    'use strict';

    angular
        .module('app')
        .controller('LobbyController', LobbyController);

    LobbyController.$inject = ['lobbyService', '$state'];

    function LobbyController (lobbyService, $state) {
        var vm = this;

        vm.newRoomModel = {
            width: 0,
            height: 0,
            minesCount: 0
        };

        vm.getRooms = function () {
            return lobbyService.rooms;
        };

        vm.refreshRooms = function () {
            lobbyService.getRooms();
        };

        vm.joinRoom = function (id) {

            var promise = lobbyService.joinRoom(id);

            promise.then(function () {
                $state.go('game');
            });
        };

        vm.createRoom = function () {
            console.log(vm.newRoomModel);
            var promise = lobbyService.createRoom(vm.newRoomModel);

            promise.then(function () {
                $state.go('game');
            });
        };

    }
})();