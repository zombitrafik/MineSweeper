(function () {
    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = [];

    function HeaderController () {
        var vm = this;

        return vm;
    }
})();