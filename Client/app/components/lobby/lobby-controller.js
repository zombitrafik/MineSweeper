(function () {
    'use strict';

    angular
        .module('app')
        .controller('LobbyController', LobbyController);

    LobbyController.$inject = ['lobbyService', '$state'];

    function LobbyController (lobbyService, $state) {
        var vm = this;

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
            var promise = lobbyService.createRoom();

            promise.then(function () {
                $state.go('game');
            });
        }
    }
})();