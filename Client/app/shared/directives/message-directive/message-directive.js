(function () {
    angular
        .module('app')
        .directive('message', message);

    message.$inject = [];
    function message () {
        var directive = {
            restrict: 'E',
            link: link,
            scope: {
                message: '='
            },
            templateUrl: 'components/messages/templates/message-template.html',
            controller: 'PrivateMessagesController',
            controllerAs: 'vm'
        };

        return directive;

        function link (scope, element, attrs) {

        }
    }
})();