(function () {
    angular
        .module('app')
        .service('gameEndScreenService', gameEndScreenService);

    gameEndScreenService.$inject = ['lobbyService', '$q', 'leaderboardService'];

    function gameEndScreenService (lobbyService, $q, leaderboardService) {
        var service = {
            open: false,
            nextRoom: nextRoom,
            stats: [],
            leaveRoomMethod: function () {},
            getStats: getStats
        };

        return service;

        function nextRoom () {
            var deferred = $q.defer();
            var promise = lobbyService.nextRoom();
            promise.then(function (id) {
                service.leaveRoomMethod().then(function () {
                    lobbyService.joinRoom(id).then(function () {
                        deferred.resolve();
                    });
                })
            });
            return deferred.promise;
        }

        function getStats () {
            var promise = leaderboardService.getGameStats();
            promise.then(function (response) {
                console.log(response);
                service.stats = response.plain();
            });
            return promise;
        }
    }
})();