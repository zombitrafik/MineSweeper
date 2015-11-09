(function () {
    angular
        .module('app')
        .service('storageService', storageService);

    storageService.$inject = [];

    function storageService () {
        var service = {
            map: [],
            canvases: [],
            blocks: [],
            selector: ''
        };

        return service;
    }
})();