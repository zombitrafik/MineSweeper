(function () {
    angular
        .module('app')
        .controller('LeaderboardController', LeaderboardController);

    LeaderboardController.$inject = ['leaderboardService', '$state'];

    function LeaderboardController (leaderboardService, $state) {
        var vm = this;

        vm.currentExpand = undefined;

        vm.init = function () {
            leaderboardService.getItems();
        };

        vm.isExpanded = function (id) {
            return vm.currentExpand === id;
        };

        vm.expand = function (id) {
            vm.currentExpand = id;
        };

        vm.unexpand = function () {
            vm.currentExpand = undefined;
        };


        vm.getItems = function () {
            return leaderboardService.items;
        };

        vm.back = function () {
            $state.go('room-list');
        };

        return vm;
    }
})();