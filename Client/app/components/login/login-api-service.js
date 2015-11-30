(function () {
    'use strict';

    angular
        .module('app')
        .service('loginApiService', loginApiService);

    loginApiService.$inject = ['Restangular'];

    function loginApiService (Restangular) {
        var service = {
            login: login,
            logout: logout,
            current: current
        };

        return service;

        function login (credentials) {
            return Restangular.one('user').customGET(null, {}, credentials);
        }

        function logout () {
            return Restangular.one('logout').customPOST();
        }

        function current () {
            return Restangular.one('user').customGET();
        }

    }
})();