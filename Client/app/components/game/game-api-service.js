(function () {
    'use strict';

    angular
        .module('app')
        .service('gameApiService', gameApiService);

    gameApiService.$inject = ['Restangular'];

    function gameApiService (Restangular) {
        var service = {
            openCell: openCell,
            setFlag: setFlag,
            leaveRoom: leaveRoom,
            joinRoom: joinRoom
        };

        return service;

        function openCell (cell) {
            return Restangular.one('rooms/testClick').customPOST(cell);
        }

        function setFlag (cell) {
            return Restangular.one('rooms/testRightClick').customPOST(cell);
        }

        function leaveRoom () {
            return Restangular.one('rooms/leave').customPOST();
        }

        function joinRoom (id) {
            return Restangular.one('rooms', id).customPOST();
        }

    }
})();