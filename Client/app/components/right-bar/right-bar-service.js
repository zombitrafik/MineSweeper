(function () {
    angular
        .module('app')
        .service('rightBarService', rightBarService);

    rightBarService.$inject = ['chatService'];

    function rightBarService (chatService) {

    }
})();