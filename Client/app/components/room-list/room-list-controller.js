(function () {
    'use strict';

    angular
        .module('app')
        .controller('RoomListController', RoomListController);

    RoomListController.$inject = ['roomListService', '$state', '$timeout'];

    function RoomListController (roomListService, $state, $timeout) {
        var vm = this;

        vm.isCreating = false;

        vm.error = undefined;

        vm.isRefreshing = false;

        vm.roomModel = {
            name: '',
            width: '',
            height: '',
            minesCount: '',
            minRating: '',
            playersCount: ''
        };

        vm.clearError = function () {
            vm.error = undefined;
        };

        vm.isPending = function () {
            return roomListService.roomsPending;
        };

        vm.getRooms = function () {
            return roomListService.rooms;
        };

        vm.isCreate = function () {
            return vm.isCreating;
        };

        vm.refreshRooms = function () {
            vm.isRefreshing = true;
            roomListService.getRooms().finally(function () {
                $timeout(function () {
                    vm.isRefreshing = false;
                }, 100);
            });
        };

        vm.joinRoom = function (id) {
            vm.clearError();
            var promise = roomListService.joinRoom(id);
            promise.then(function (response) {
                $state.go('lobby', {id: id});
            }).catch(function (errorPayload) {
                var key = errorPayload.data.data.ERROR;
                vm.error = ERRORS_KEYS[key];
            });
        };

        vm.createRoom = function () {
            vm.isCreating = true;
        };

        vm.cancelCreate = function () {
            vm.clearError();
            vm.isCreating = false;
            resetModel();
        };

        vm.sendCreateRequest = function () {
            vm.clearError();
            var promise = roomListService.createRoom(vm.roomModel);
            promise.then(function (id) {
                $state.go('lobby', {id: id});
            }).catch(function (errorPayload) {
                var key = errorPayload.data.data.ERROR;
                vm.error = ERRORS_KEYS[key];
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