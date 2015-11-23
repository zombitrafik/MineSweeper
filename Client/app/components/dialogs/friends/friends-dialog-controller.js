(function () {
    angular
        .module('app')
        .controller('FriendsDialogController', FriendsDialogController);

    FriendsDialogController.$inject = ['friendsDialogService'];

    function FriendsDialogController (friendsDialogService) {
        var vm = this;

        vm.model = {
            username: ''
        };

        vm.find = function () {
            friendsDialogService.find(vm.model.username).then(function (response) {
                console.log(response);
            });
        };

        vm.close = function () {
            friendsDialogService.hideDialog();
        };

        return vm;
    }
})();