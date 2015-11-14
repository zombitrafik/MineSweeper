(function () {
    'use strict';

    angular
        .module('app')
        .service('LoginService', loginService);

    loginService.$inject = ['loginApiService', '$window', 'socketService', '$q', 'popupService'];

    function loginService (loginApiService, $window, socketService, $q, popupService) {

        var service = {
            login: login,
            logout: logout
        };

        popupService.createPopup('est');

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

        function  logout () {
            return loginApiService.logout();
        }
    }
})();