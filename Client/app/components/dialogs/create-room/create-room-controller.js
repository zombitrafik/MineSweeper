(function () {
    angular
        .module('app')
        .controller('CreateRoomController', CreateRoomController);

    CreateRoomController.$inject = ['createRoomService', 'roomListService', '$state'];

    function CreateRoomController (createRoomService, roomListService, $state) {
        var vm = this;

        vm.model = {
            name: '',
            width: '',
            height: '',
            minesCount: ''
        };

        vm.close = function () {
            createRoomService.hideDialog();
        };

        vm.createRoom = function () {
            var promise = roomListService.createRoom(vm.model);
            promise.then(function () {
                vm.close();
                $state.go('game');
            });
        };

        return vm;
    }
})();