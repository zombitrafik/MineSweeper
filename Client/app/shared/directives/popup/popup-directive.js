(function () {
    angular
        .module('app')
        .directive('popup', popup);

    popup.$inject = [];

    function popup () {
        var directive = {
            restrict: 'E',
            link: link,
            controller: PopupController,
            controllerAs: 'popup',
            templateUrl: 'shared/directives/popup/template/popup.html'
        };

        return directive;

        function link (scope, element, attrs) {
            scope.name = attrs.name;
            scope.x = parseInt(attrs.x);
            scope.y = parseInt(attrs.y);
            scope.element = angular.element(element[0]);
        }
    }

    function PopupController ($scope) {
        this.getName = function () {
            return $scope.name;
        };
        this.getY = function () {
            return $scope.y;
        };

        this.getX = function () {
            return $scope.x;
        };
    }
})();