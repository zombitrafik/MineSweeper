(function () {
    'use strict';
    angular
        .module('app')
        .directive('chat', chat);

    function chat () {
        return {
            restrict: 'EC',
            link: link,
            templateUrl: 'shared/directives/chat/template.html'
        };

        function link (scope, element, attrs) {

        }
    }
})();