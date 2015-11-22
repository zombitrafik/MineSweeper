(function () {
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['pageService'];

    function HeaderController (pageService) {
        var vm = this;

        vm.isShowMenu = false;

        vm.toggleMenu = function () {
            pageService.toggleMenu();
        };

        return vm;
    }
})();