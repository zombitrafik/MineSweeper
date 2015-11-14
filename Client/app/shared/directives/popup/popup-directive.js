(function () {
    angular
        .module('app')
        .directive('popup', popup);

    popup.$inject = [];

    function popup () {
        var directive = {
            restrict: 'E',
            link: link
        };

        return directive;

        function link (scope, element, attrs) {
            console.log('linked');
        }
    }
})();