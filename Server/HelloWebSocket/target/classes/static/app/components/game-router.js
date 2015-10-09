'use strict';

app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state({
            name: 'game',
            url: '/game',
            views: {
                'mainView': {
                    templateUrl: 'components/game/game-index.html'
                }
            }
        })

        .state({
            name: 'login',
            url: '/login',
            views: {
                'mainView': {
                    templateUrl: 'components/login/login-index.html'
                }
            }
        })
});