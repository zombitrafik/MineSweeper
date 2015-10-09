(function () {
    'use strict';

    angular
        .module('app')
        .config(configuration);

    configuration.$inject = ['$urlRouterProvider', '$stateProvider'];

    function configuration ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state({
                name: 'game',
                url: '/game',
                views: {
                    'mainView': {
                        templateUrl: 'components/game/game-index.html',
                        controller: 'GameController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state({
                name: 'login',
                url: '/login',
                views: {
                    'mainView': {
                        templateUrl: 'components/login/login-index.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state({
                name: 'register',
                url: '/register',
                views: {
                    'mainView' : {
                        templateUrl: 'components/register/register-index.html',
                        controller: 'RegisterController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state({
                name: 'lobby',
                url: '/lobby',
                views: {
                    'mainView' : {
                        templateUrl: 'components/lobby/lobby-index.html',
                        controller: 'LobbyController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
