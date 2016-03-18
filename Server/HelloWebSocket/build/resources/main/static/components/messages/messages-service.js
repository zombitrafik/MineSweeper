(function () {
    angular
        .module('app')
        .service('messagesService', messagesService);
    
    messagesService.$inject = ['messagesApiService'];
        
    function messagesService (messagesApiService) {
        var service = {
            isSelectedTab: isSelectedTab,
            getMessageList: getMessageList,
            loadPrivateMessage: loadPrivateMessage,
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
            return messagesApiService.getMessageList();
        }

        function handleMessages (message) {

        }

        function loadPrivateMessage (username) {
            return messagesApiService.loadPrivateMessage(username);
        }

    }
})();