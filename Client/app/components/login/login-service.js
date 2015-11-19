(function () {
    'use strict';

    angular
        .module('app')
        .service('LoginService', loginService);

    loginService.$inject = ['loginApiService', '$window', 'socketService', '$q', 'cacheService'];

    function loginService (loginApiService, $window, socketService, $q, cacheService) {

        var service = {
            login: login,
            logout: logout
        };


        return service;

        function login (model) {
            var defered = $q.defer();
            var credentials = { authorization: 'Basic ' + $window.btoa(model.username + ':' + model.password)};
            var promise = loginApiService.login(credentials);
            promise.then(function (user) {
                cacheService.item(ROUTE_REQUIRES.AUTH, true).then(function () {

                    defered.resolve();

                }).catch(function () {
                    defered.reject();
                });
            });
            return defered.promise;
        }

        function  logout () {
            cacheService.clear();
            return loginApiService.logout();
        }
    }
})();