(function () {
    angular
        .module('app')
        .service('rightBarService', rightBarService);

    rightBarService.$inject = ['chatService', 'stateService'];

    function rightBarService (chatService, stateService) {
        var service = {
            isThisPage: isThisPage
        };
        return service;

        function isThisPage (page) {
            return stateService.isThisPage(page);
        }
    }
})();