(function () {
    angular
        .module('app')
        .controller('LeaderboardController', LeaderboardController);

    LeaderboardController.$inject = ['leaderboardService'];

    function LeaderboardController (leaderboardService) {
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

        return vm;
    }
})();