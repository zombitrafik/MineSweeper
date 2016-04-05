(function () {
    angular
        .module('app')
        .service('pageService', pageService);

    pageService.$inject = ['$state'];

    function pageService ($state) {

        var states = ['login', 'register', 'room-list'];

        var service = {
            hasRightbar: hasRightbar
        };

        return service;

        function hasRightbar () {
            return states.indexOf($state.current.name) === -1
        }
    }
})();