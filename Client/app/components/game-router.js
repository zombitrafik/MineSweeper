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
                requires: [],
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
                    }
                }
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
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
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
                },
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
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
                },
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
                    }
                }
            })

            .state({
                name: 'room-list',
                url: '/room-list',
                views: {
                    'mainView': {
                        templateUrl: 'components/room-list/room-list-index.html',
                        controller: 'RoomListController',
                        controllerAs: 'vm'
                    }
                },
                requires: [
                    ROUTE_REQUIRES.AUTH
                ],
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
                    }
                }
            })

            .state({
                name: 'lobby',
                url: '/lobby/:id',
                views: {
                    'mainView': {
                        templateUrl: 'components/lobby/lobby-index.html',
                        controller: 'LobbyController',
                        controllerAs: 'vm'
                    }
                },
                requires: [
                    ROUTE_REQUIRES.AUTH
                ],
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
                    }
                }
            })

            .state({
                name: 'messages',
                url: '/messages/:recipient',
                views: {
                    'mainView': {
                        templateUrl: 'components/messages/messages-index.html',
                        controller: 'MessagesController',
                        controllerAs: 'vm'
                    }
                },
                requires: [
                    ROUTE_REQUIRES.AUTH
                ],
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
                    }
                }
            })

            .state({
                name: 'friends',
                url: '/friends?action',
                views: {
                    'mainView': {
                        templateUrl: 'components/friends/friends-index.html',
                        controller: 'FriendsController',
                        controllerAs: 'vm'
                    }
                },
                requires: [
                    ROUTE_REQUIRES.AUTH
                ],
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
                    }
                }
            })

            .state({
                name: 'leaderboard',
                url: '/leaderboard',
                views: {
                    'mainView': {
                        templateUrl: 'components/leaderboard/leaderboard-index.html',
                        controller: 'LeaderboardController',
                        controllerAs: 'vm'
                    }
                },
                requires: [
                    ROUTE_REQUIRES.AUTH
                ],
                resolve: {
                    auth: function (routeService, $q, $state, cacheService, loginService, globalInitService) {
                        return checkRoute(routeService, $q, $state, cacheService, loginService, globalInitService, this.self.requires);
                    }
                }
            });

    }

    function checkRoute (routeService, $q, $state, cacheService, loginService, globalInitService, requires) {
        var deferred = $q.defer();

        cacheService.init().then(function () {

            if(!loginService.isInit && !_.isEmpty(requires)) {

                loginService.current().then(function () {
                    if(!globalInitService.isInit) {
                        globalInitService.init().then(function () {
                            deferred.resolve();
                        });
                    } else {
                        deferred.resolve();
                    }
                }).catch(function () {
                    $state.go('login');
                    cacheService.clear();
                    deferred.reject();
                });
            } else {
                routeService.checkRoute(requires).then(function () {
                    if(!globalInitService.isInit && !_.isEmpty(requires)) {
                        globalInitService.init().then(function () {
                            deferred.resolve();
                        })
                    } else {
                        deferred.resolve();
                    }
                }).catch(function () {
                    $state.go('login');
                    deferred.reject();
                });
            }
        }).catch(function () {
            deferred.reject();
        });

        return deferred.promise;
    }


    running.$inject = ['$rootScope', 'routeService', '$q', '$state', 'cacheService', 'loginService'];

    function running ($rootScope, routeService, $q, $state, cacheService, loginService) {
        /*$rootScope.$on('$stateChangeStart', function(event, toState) {


        });*/
    }

})();
