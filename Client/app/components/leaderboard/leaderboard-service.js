(function () {
    angular
        .module('app')
        .service('leaderboardService', leaderboardService);

    leaderboardService.$inject = ['leaderboardApiService'];

    function leaderboardService (leaderboardApiService) {
        var service = {
            getItems: getItems,
            getGameStats: getGameStats,
            items: []
        };

        return service;

        function getItems () {
            leaderboardApiService.getLeaderboard().then(function (response) {
                service.items = response.content;
            });
        }

        function getGameStats () {
            return leaderboardApiService.getGameStats();
        }
    }

})();