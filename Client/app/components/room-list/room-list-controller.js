(function () {
    'use strict';

    angular
        .module('app')
        .controller('RoomListController', RoomListController);

    RoomListController.$inject = ['roomListService', '$state'];

    function RoomListController (roomListService, $state) {
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
            return roomListService.rooms;
        };

        vm.isCreate = function () {
            return vm.isCreating;
        };

        vm.refreshRooms = function () {
            roomListService.getRooms();
        };

        vm.joinRoom = function (id) {

            var promise = roomListService.joinRoom(id);

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
            var promise = roomListService.createRoom(vm.roomModel);
            promise.then(function () {
                $state.go('game');
            });
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