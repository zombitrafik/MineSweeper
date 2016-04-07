(function () {
    angular
        .module('app')
        .service('inviteService', inviteService);
    
    inviteService.$inject = [];
        
    function inviteService () {
        var service = {
            invitations: [],
            addInvitation: addInvitation
        };
        return service;

        function addInvitation (info) {
            service.invitations.unshift(info);

            /*
             roomBombs
             :
             400
             roomHeight
             :
             40
             roomId
             :
             10
             roomName
             :
             "test"
             roomWidth
             :
             40
             username
             :
             "zombitrafik2"
             */
        }

    }
})();