(function () {
    'use strict';

    angular
        .module('app')
        .service('gameApiService', gameApiService);

    gameApiService.$inject = ['Restangular'];

    function gameApiService (Restangular) {
        var service = {
            openCell: openCell,
            setFlag: setFlag
        };

        return service;

        function openCell (cell, roomId) {
            return Restangular.one('lobby/testClick', roomId).customPOST(cell);
        }

        function setFlag (cell, roomId) {
            return Restangular.one('lobby/testRightClick', roomId).customPOST(cell);
        }
    }
})();