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
            controller: '@',
            name: 'controllerName',
            controllerAs: 'vm'
        };

        return directive;

        function link (scope, element, attrs) {

        }
    }
})();