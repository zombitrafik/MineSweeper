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

        function controller ($scope) {
            var ifdc = this;

            var pending = false;

            ifdc.userList = [
                {
                    username: 'test 1',
                    status: 'ONLINE'
                },
                {
                    username: 'test 2',
                    status: 'OFFLINE'
                },
                {
                    username: 'test 3',
                    status: 'ONLINE'
                },
                {
                    username: 'test 4',
                    status: 'ONLINE'
                },
                {
                    username: 'test 5',
                    status: 'OFFLINE'
                },
                {
                    username: 'test 6',
                    status: 'ONLINE'
                }
            ];

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
                if(ifdc.model.username.trim() == '') {
                    ifdc.userList = [];
                    pending = false;
                    return;
                }

                pending = true;
                userService.find(ifdc.model.username).then(function (response) {
                    ifdc.userList = response.data.userList;
                }).finally(function () {
                    pending = false;
                });
            };

            ifdc.select = function (user) {
                pending = true;
                $scope.onSelect(user).finally(function () {
                    ifdc.updateList();
                });
            };

            return ifdc;
        }
    }
})();