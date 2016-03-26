(function () {
    angular
        .module('app')
        .controller('LobbyController', LobbyController);

    LobbyController.$inject = ['$state', 'lobbyService', '$q', 'chatService'];

    function LobbyController ($state, lobbyService, $q, chatService) {
        var vm = this;

        var isInvitingFriends = false;

        var getRoomId = function () {
            return $state.params.id;
        };

        vm.getPlayers = function () {
            return lobbyService.players;
        };

        vm.getMaxPlayers = function () {
            return lobbyService.maxPlayers;
        };

        vm.getLobbyLeader = function () {

        };

        vm.getCurrentUser = function () {

        };

        vm.startGame = function() {
            //may be do some request
            $state.go('game');
        };

        vm.isInviteFriend = function () {
            return isInvitingFriends;
        };

        vm.inviteFriend = function () {
            isInvitingFriends = !isInvitingFriends;
        };

        vm.leaveRoom = function () {
            $state.go('room-list');
        };

        vm.onUserInvite = function (info) {
            var deferred = $q.defer();

            setTimeout(function () {
                deferred.resolve();
            }, 500);

            return deferred.promise;
        };

        vm.refreshPlayers = function () {
            lobbyService.getPlayers(getRoomId());
        };

        vm.openChat = function (username) {
            chatService.openChat(username);
        };

        return vm;
    }
})();