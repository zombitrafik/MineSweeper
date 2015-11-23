(function () {
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['pageService', 'stateService'];

    function HeaderController (pageService, stateService) {
        var vm = this;

        vm.isShowMenu = false;

        vm.notifications = [{
            type: 'test',
            data: 'test data'
        }];

        vm.toggleMenu = function () {
            pageService.toggleMenu();
        };

        vm.isThisPage = function (page) {
            return stateService.isThisPage(page);
        };

        return vm;
    }
})();