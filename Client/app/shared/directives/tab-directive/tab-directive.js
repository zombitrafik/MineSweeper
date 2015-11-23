(function () {
    angular
        .module('app')
        .directive('tab', tab);

    tab.$inject = [];

    function tab () {
        var directive = {
            restrict: 'E',
            link: link,
            replace: true,
            scope: {
                header: '@',
                messages: '='
            },
            templateUrl: 'shared/directives/tab-directive/template/template.html',
            controller: TabController,
            controllerAs: 'vm'
        };

        return directive;

        function link (scope, element, attrs) {

        }
    }

    TabController.$inject = ['$scope', 'messagesService'];

    function TabController ($scope, messagesService) {
        var vm = this;
        vm.header = $scope.header;
        vm.messages = $scope.messages;

        vm.selectTab = function () {
            messagesService.selectTab(vm.header);
        };

        vm.isSelected = function () {
            return messagesService.isSelectedTab(vm.header);
        };

        vm.getMessages = function () {
            return vm.messages;
        };

        return vm;
    }
})();