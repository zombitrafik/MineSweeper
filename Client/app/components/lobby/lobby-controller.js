(function () {
    angular
        .module('app')
        .controller('LobbyController', LobbyController);

    LobbyController.$inject = ['$state', 'lobbyService', '$q', 'chatService', 'loginService', 'gameApiService'];

    function LobbyController ($state, lobbyService, $q, chatService, loginService, gameApiService) {
        var vm = this;

        var isInvitingFriends = false;

        var getRoomId = function () {
            return $state.params.id;
        };

        vm.getPlayers = function () {
            return lobbyService.roomInfo.players;
        };

        vm.getMaxPlayers = function () {
            return lobbyService.roomInfo.playersCount;
        };

        vm.getLobbyLeader = function () {
            return _.find(lobbyService.roomInfo.players, function (player) {
                return player.leader == true;
            });
        };

        vm.getCurrentUser = function () {
            return loginService.currentUser;
        };

        vm.startGame = function() {
            lobbyService.startGame().then(function () {
                $state.go('game');
            });
        };

        vm.isInviteFriend = function () {
            return isInvitingFriends;
        };

        vm.inviteFriend = function () {
            isInvitingFriends = !isInvitingFriends;
        };

        vm.leaveRoom = function () {
            gameApiService.leaveRoom().finally(function () {
                $state.go('room-list');
            });
        };

        vm.onUserInvite = function (info) {
            return lobbyService.inviteUser(info.username);
        };

        vm.getCurrentRoom = function () {
            lobbyService.getCurrentRoom();
        };

        vm.openChat = function (username) {
            chatService.openChat(username);
        };

        return vm;
    }
})();