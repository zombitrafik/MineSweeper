(function () {
    'use strict';

    angular
        .module('app')
        .controller('LobbyController', LobbyController);

    LobbyController.$inject = ['lobbyService', '$state', 'createRoomService'];

    function LobbyController (lobbyService, $state, createRoomService) {
        var vm = this;

        vm.isCreating = false;

        vm.newRoomModel = {
            width: 0,
            height: 0,
            minesCount: 0
        };

        vm.roomModel = {
            name: '',
            width: '',
            height: '',
            minesCount: ''
        };

        vm.getRooms = function () {
            return lobbyService.rooms;
        };

        vm.isCreate = function () {
            return vm.isCreating;
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
            vm.isCreating = true;
        };

        vm.cancelCreate = function () {
            vm.isCreating = false;
            resetModel();
        };

        vm.sendCreateRequest = function () {
            var promise = lobbyService.createRoom(vm.roomModel);
            promise.then(function () {
                $state.go('game');
            });
        };

        vm.isShowCreateMenuDialog = function () {
            return createRoomService.isShow;
        };

        function resetModel () {
            vm.roomModel = {
                name: '',
                width: '',
                height: '',
                minesCount: ''
            };
        }

    }
})();