(function () {
    'use strict';

    angular
        .module('app')
        .controller('RoomListController', RoomListController);

    RoomListController.$inject = ['roomListService', '$state'];

    function RoomListController (roomListService, $state) {
        var vm = this;

        vm.isCreating = false;

        vm.roomModel = {
            name: '',
            width: '',
            height: '',
            minesCount: '',
            minRating: '',
            playersCount: ''
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

            promise.then(function (response) {
                console.log(response);
                $state.go('lobby', {id: id});
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
                $state.go('lobby');
            });
        };

        function resetModel () {
            vm.roomModel = {
                name: '',
                width: '',
                height: '',
                minesCount: '',
                minRating: '',
                playersCount: ''
            };
        }

    }
})();