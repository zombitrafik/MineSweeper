(function () {
    angular
        .module('app')
        .service('inviteService', inviteService);

    inviteService.$inject = ['roomListService', '$state'];

    function inviteService(roomListService, $state) {
        var service = {
            invitations: [],
            addInvitation: addInvitation,
            getHash: getHash,
            removeInvitation: removeInvitation,
            find: find,
            acceptInvitation: acceptInvitation
        };
        return service;

        function addInvitation(info) {
            var hash = getHash(info);
            if(find(hash) == undefined) {
                info.hash = hash;
                service.invitations.unshift(info);
            }
        }

        function find(hash) {
            var index = _.findIndex(service.invitations, function (invitation) {
                return invitation.hash == hash;
            });
            return index > -1 ? {invitation: service.invitations[index], index: index} : undefined;
        }

        function removeInvitation(hash) {
            var index = find(hash).index;
            service.invitations.splice(index, 1);
        }

        function acceptInvitation (hash) {
            var invitation = find(hash).invitation;
            removeInvitation(hash);

            var promise = roomListService.joinRoom(invitation.roomId);

            promise.then(function (response) {
                $state.go('lobby', {id: id});
            }).catch(function (errorPayload) {
                console.error(errorPayload);
            });
        }

        function getHash(info) {
            return info.roomWidth + info.roomHeight + info.roomBombs + info.roomId + info.username;
        }

    }
})();