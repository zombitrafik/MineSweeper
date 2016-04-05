(function () {
    angular
        .module('app')
        .service('lobbyApiService', lobbyApiService);

    lobbyApiService.$inject = ['Restangular'];

    function lobbyApiService (Restangular) {
        var service = {
            getPlayers: getPlayers,
            inviteUser: inviteUser,
            startGame: startGame
        };
        return service;

        function getPlayers (id) {
            return Restangular.one('lobby', id).customGET('players');
        }

        function inviteUser (username) {
            return Restangular.one('rooms', 'invite').customPOST(username);
        }

        function startGame () {
            return Restangular.one('rooms', 'start').customPOST();
        }
    }
})();