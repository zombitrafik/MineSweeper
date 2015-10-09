(function () {
    'use strict';

    angular
        .module('app')
        .service('lobbyService', lobbyService);

    lobbyService.$inject = ['lobbyApiService'];

    function lobbyService () {

    }
})();