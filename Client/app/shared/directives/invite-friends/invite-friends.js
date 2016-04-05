(function () {
    angular
        .module('app')
        .directive('inviteFriends', inviteFriends);

    inviteFriends.$inject = ['userService'];

    function inviteFriends(userService) {
        return {
            restrict: 'EC',
            link: link,
            scope: { onSelect: '=' },
            controller: controller,
            controllerAs: 'ifdc', //inviteFriendsDirectiveController
            templateUrl: 'shared/directives/invite-friends/template.html'
        };

        function link(scope, element, attrs) {

        }

        function controller ($scope, $timeout) {
            var ifdc = this;

            var pending = false;

            var timeoutPromise = undefined;

            ifdc.userList = [];

            ifdc.model = {
                username: ''
            };

            ifdc.getUserList = function () {
                return ifdc.userList;
            };

            ifdc.isPending = function () {
                return pending;
            };

            ifdc.updateList = function () {
                if(timeoutPromise) {
                    $timeout.cancel(timeoutPromise);
                    timeoutPromise = undefined;
                }
                if(ifdc.model.username.trim() == '') {
                    ifdc.userList = [];
                    pending = false;
                } else {
                    pending = true;
                    timeoutPromise = $timeout(function () {
                        ifdc.sendSearchRequest();
                    }, 200);
                }
            };

            ifdc.sendSearchRequest = function () {
                userService.find(ifdc.model.username).then(function (response) {
                    ifdc.userList = response.data.userList;
                }).finally(function () {
                    pending = false;
                });
            };

            ifdc.select = function (user) {
                pending = true;
                $scope.onSelect(user).finally(function () {
                    ifdc.sendSearchRequest();
                });
            };

            return ifdc;
        }
    }
})();