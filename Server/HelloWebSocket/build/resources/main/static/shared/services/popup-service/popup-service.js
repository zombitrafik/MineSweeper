(function () {
    angular
        .module('app')
        .service('popupService', popupService);

    popupService.$inject = ['$compile', '$rootScope'];

    function popupService ($compile, $rootScope) {
        var service = {
            createPopup: createPopup,
            init: init,
            popups: [],
            clearService: clearService
        };

        return service;

        function clearService () {
            service.popups = [];
        }

        function init (selector) {
            service.selector = selector;
        }

        function createPopup (name, x, y) {
            if(service.popups[name]) {
               service.popups[name].remove();
            }
            var parent = angular.element(document.querySelector(service.selector));
            var html = '<popup name=' + name + ' x=' + x + ' y=' + y + '></popup>';
            var scope = $rootScope.$new();
            var element = $compile(html)(scope);
            service.popups[name] = element;
            parent.append(element);
        }
    }
})();