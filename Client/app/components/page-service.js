(function () {
    angular
        .module('app')
        .service('pageService', pageService);

    pageService.$inject = ['$state'];

    function pageService ($state) {

        var states = ['login', 'register', 'room-list', 'leaderboard'],
            gameState = 'game';

        var service = {
            hasRightbar: hasRightbar,
            isGameState: isGameState
        };

        return service;

        function hasRightbar () {
            return states.indexOf($state.current.name) === -1
        }

        function isGameState () {
            return $state.current.name == gameState;
        }
    }
})();