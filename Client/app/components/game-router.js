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

        .state({
            name: 'register',
            url: '/register',
            views: {
                'mainView' : {
                    templateUrl: 'components/register/register-index.html'
                }
            }
        })

        .state({
            name: 'lobby',
            url: '/lobby',
            views: {
                'mainView' : {
                    templateUrl: 'components/lobby/lobby-index.html'
                }
            }
        });
});