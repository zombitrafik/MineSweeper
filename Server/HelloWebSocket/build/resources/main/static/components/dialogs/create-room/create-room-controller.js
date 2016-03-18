(function () {
    angular
        .module('app')
        .controller('CreateRoomController', CreateRoomController);

    CreateRoomController.$inject = ['createRoomService', 'lobbyService', '$state'];

    function CreateRoomController (createRoomService, lobbyService, $state) {
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
            var promise = lobbyService.createRoom(vm.model);
            promise.then(function () {
                vm.close();
                $state.go('game');
            });
        };

        return vm;
    }
})();