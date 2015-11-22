(function () {
    angular
        .module('app')
        .service('createRoomService', createRoomService);

    createRoomService.$inject = [];

    function createRoomService () {
        var service = {
            showDialog: showDialog,
            hideDialog: hideDialog,
            isShow: false
        };

        return service;

        function showDialog () {
            service.isShow = true;
        }

        function hideDialog () {
            service.isShow = false;
        }
    }

})();