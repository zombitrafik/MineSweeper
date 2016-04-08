(function () {
    angular
        .module('app')
        .directive('inviteNotification', inviteNotification);

    inviteNotification.$inject = ['inviteService'];

    function inviteNotification (inviteService) {
        return {
            restrict: 'EC',
            link: link,
            scope: true,
            templateUrl: 'shared/directives/invite-friends/invite-dialog/template.html',
            controller: controller,
            controllerAs: 'vm'
        };

        function link (scope, elements, attrs) {

        }

        function controller () {
            var vm = this;

            vm.getInvitation = function () {
                return inviteService.invitations;
            };

            vm.removeInvitation = function (hash) {
                inviteService.removeInvitation(hash);
            };

            vm.acceptInvitation = function (hash) {
                inviteService.acceptInvitation(hash);
            };

            return vm;
        }

    }
})();