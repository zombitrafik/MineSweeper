(function () {
    angular
        .module('app')
        .service('alertService', alertService);
    
    alertService.$inject = [];
        
    function alertService () {
        var service = {
            openAlert: openAlert
        };
        return service;

        function openAlert (message) {
            console.log(message);
        }
    }
})();