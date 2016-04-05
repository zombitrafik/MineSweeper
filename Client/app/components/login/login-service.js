(function () {
    'use strict';

    angular
        .module('app')
        .service('loginService', loginService);

    loginService.$inject = ['loginApiService', '$window', 'socketService', '$q', 'cacheService', '$state'];

    function loginService (loginApiService, $window, socketService, $q, cacheService, $state) {

        var service = {
            login: login,
            logout: logout,
            current: current,
            isLoggined: false,
            isInit: false,
            currentUser: {}
        };


        return service;

        function login (model) {
            var deferred = $q.defer();
            var credentials = { authorization: 'Basic ' + $window.btoa(model.username + ':' + model.password)};
            var promise = loginApiService.login(credentials);
            promise.then(function (user) {
                service.currentUser = user.plain();
                cacheService.item(ROUTE_REQUIRES.AUTH, user.plain()).then(function () {
                    service.isLoggined = true;
                    service.isInit = true;
                    deferred.resolve();
                }).catch(function () {
                    deferred.reject();
                });
            }).catch(function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function current () {
            var deferred = $q.defer();
            var promise = loginApiService.current();
            promise.then(function (response) {
                service.isInit = true;
                deferred.resolve();
                service.currentUser = response.plain();
            }).catch(function () {
                $state.go('login');
                deferred.reject();
            });
            return deferred.promise;
        }

        function  logout () {
            cacheService.clear();
            socketService.unsubscribeAll();
            service.isLoggined = false;
            service.isInit = false;
            service.currentUser = {};
            return loginApiService.logout();
        }
    }
})();