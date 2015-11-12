(function () {
    'use strict';

    angular
        .module('app')
        .service('LoginService', loginService);

    loginService.$inject = ['loginApiService', '$window', 'socketService', '$q'];

    function loginService (loginApiService, $window, socketService, $q) {

        var service = {
            login: login
        };

        return service;

        function login (model) {
            var defered = $q.defer();
            var credentials = { authorization: 'Basic ' + $window.btoa(model.username + ':' + model.password)};
            var promise = loginApiService.login(credentials);
            promise.then(function () {
                socketService.connect('game', function () {
                    defered.resolve();
                });
            });
            return defered.promise;
        }
    }
})();