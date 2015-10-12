(function () {
    'use strict';

    angular
        .module('app')
        .service('LoginService', loginService);

    loginService.$inject = ['loginApiService', '$window'];

    function loginService (loginApiService, $window) {

        var service = {
            login: login
        };

        return service;

        function login (model) {
            var credentials = { authoriaztion: 'Basic ' + $window.btoa(model.username + ':' + model.password)};
            return loginApiService.login(credentials);
        }
    }
})();