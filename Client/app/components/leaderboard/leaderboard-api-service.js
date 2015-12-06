(function () {
    angular
        .module('app')
        .service('leaderboardApiService', leaderboardApiService);

    leaderboardApiService.$inject = ['Restangular'];

    function leaderboardApiService (Restangular) {
        var service = {
            getLeaderboard: getLeaderboard,
            getGameStats: getGameStats
        };

        return service;

        function getLeaderboard () {
            return Restangular.one('leaderboard').customGET('', {
                page: 1,
                size: 100
            });
        }

        function getGameStats () {
            return Restangular.one('rooms/stat').customGET();
        }
    }
})();