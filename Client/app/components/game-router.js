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
                name: 'home',
                url: '/home',
                views: {
                    'mainView': {
                        templateUrl: 'components/home/home-index.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    }
                },
                requires: []
            })

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
                requires: [
                    ROUTE_REQUIRES.AUTH,
                    ROUTE_REQUIRES.ROOM
                ],
                resolve: {
                    cacheLoad: function (cacheService) {
                        return cacheService.init();
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
                requires: [
                    ROUTE_REQUIRES.AUTH
                ]
            })

            .state({
                name: 'messages',
                url: '/messages',
                views: {
                    'mainView': {
                        templateUrl: 'components/messages/messages-index.html',
                        controller: 'MessagesController',
                        controllerAs: 'vm'
                    }
                }
            });

    }


    running.$inject = ['$rootScope', 'routeService', '$q', '$state', 'cacheService'];

    function running ($rootScope, routeService, $q, $state, cacheService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {

            var deffered = $q.defer();

            cacheService.init().then(function () {
                routeService.checkRoute(toState.requires).then(function () {
                    deffered.resolve();
                }).catch(function () {
                    $state.go('login');
                    deffered.reject();
                });
            }).catch(function () {
                deffered.reject();
            });

            return deffered.promise;
        });
    }

})();
