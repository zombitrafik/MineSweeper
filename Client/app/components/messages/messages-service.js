(function () {
    angular
        .module('app')
        .service('messagesService', messagesService);
    
    messagesService.$inject = [];    
        
    function messagesService () {
        var service = {
            isSelectedTab: isSelectedTab,
            getMessageList: getMessageList,
            selectTab: selectTab,
            selectedTab: '',
            handleMessages: handleMessages
        };
        return service;

        function selectTab (tab) {
            service.selectedTab = tab;
        }
        
        function isSelectedTab (tab) {
            return service.selectedTab === tab;
        }

        function getMessageList () {

        }

        function handleMessages () {

        }
    }
})();