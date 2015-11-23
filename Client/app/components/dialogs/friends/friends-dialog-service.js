(function () {
    angular
        .module('app')
        .service('friendsDialogService', friendsDialogService);

    friendsDialogService.$inject = ['userService'];
        
    function friendsDialogService (userService) {
        var service = {
            showDialog: showDialog,
            hideDialog: hideDialog,
            isShow: false,
            find: find
        };

        return service;

        function find (username) {
            return userService.find(username);
        }

        function showDialog () {
            service.isShow = true;
        }

        function hideDialog () {
            service.isShow = false;
        }

    }
})();
