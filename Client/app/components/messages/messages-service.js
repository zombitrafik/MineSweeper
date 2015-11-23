(function () {
    angular
        .module('app')
        .service('messagesService', messagesService);
    
    messagesService.$inject = [];    
        
    function messagesService () {
        var service = {
            isSelectedTab: isSelectedTab,
            selectTab: selectTab,
            selectedTab: ''
        };
        return service;

        function selectTab (tab) {
            service.selectedTab = tab;
        }
        
        function isSelectedTab (tab) {
            return service.selectedTab === tab;
        }
    }
})();