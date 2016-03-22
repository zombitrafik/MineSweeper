(function () {
    angular
        .module('app')
        .service('lobbyApiService', lobbyApiService);

    lobbyApiService.$inject = ['Restangular'];

    function lobbyApiService (Restangular) {
        var service = {
            getPlayers: getPlayers
        };
        return service;

        function getPlayers (id) {
            return Restangular.one('lobby', id).customGET('players');
        }
    }
})();