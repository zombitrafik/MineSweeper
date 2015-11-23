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
            console.log(scope);
        }
    }

    TabController.$inject = ['$scope'];

    function TabController ($scope) {
        var vm = this;
        vm.header = $scope.header;
        vm.messages = $scope.messages;
        return vm;
    }
})();