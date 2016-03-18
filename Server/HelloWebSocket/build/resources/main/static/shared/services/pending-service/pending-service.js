(function () {
    angular
        .module('app')
        .service('pendingService', pendingService);

    pendingService.$inject = [];

    function pendingService () {
        var service = {
            add: add,
            get: get,
            remove: remove,
            exist: exist,
            pendings: [],
            clear: clear
        };

        return service;

        function add (key, value) {
            service.pendings[key] = value;
        }

        function get (key) {
            return service.pendings[key];
        }

        function remove (key) {
            service.pendings[key] = undefined;
        }

        function exist (key) {
            return service.pendings[key] !== undefined;
        }

        function clear () {
            service.pendings = [];
        }
    }
})();