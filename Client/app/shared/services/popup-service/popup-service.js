(function () {
    angular
        .module('app')
        .service('popupService', popupService);

    popupService.$inject = ['$compile'];

    function popupService ($compile) {
        var service = {
            createPopup: createPopup
        };

        return service;

        function createPopup (name) {
            var parent = angular.element(document.querySelector('body'));
            parent.append(angular.element('<popup></popup>'));

        }
    }
})();