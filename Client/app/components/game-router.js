(function () {
    'use strict';

    angular
        .module('app')
        .config(configuration)
        .run(running);

    configuration.$inject = ['$urlRouterProvider', '$stateProvider'];

    function configuration($urlRouterProvider, $stateProvider) {
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
                },
                requires: ['USER']
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
                    'mainView': {
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
                    'mainView': {
                        templateUrl: 'components/lobby/lobby-index.html',
                        controller: 'LobbyController',
                        controllerAs: 'vm'
                    }
                },
                requires: ['USER']
            });

    }


    running.$inject = ['$rootScope', 'sessionService', '$q', '$state'];

    function running ($rootScope, sessionService, $q, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            var deffered = $q.defer();
            sessionService.checkAuth(toState.requires).then(function () {
                deffered.resolve();
            }).catch(function () {
                $state.go('login');
                deffered.reject();
            });
            return deffered.promise;
        });
    }

})();
