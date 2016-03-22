(function () {
    angular
        .module('app')
        .service('lobbyService', lobbyService);

    lobbyService.$inject = ['lobbyApiService'];

    function lobbyService (lobbyApiService) {

        var players = [
            {
                name: 'zombitrafik',
                rating: 1350,
                isLeader: true
            },
            {
                name: 'kimreik',
                rating: 760,
                isLeader: false
            },
            {
                name: 'kimreik 2',
                rating: 760,
                isLeader: false
            },
            {
                name: 'kimreik 3',
                rating: 760,
                isLeader: false
            },
            {
                name: 'kimreik 4',
                rating: 760,
                isLeader: false
            },
            {
                name: 'kimreik 5',
                rating: 760,
                isLeader: false
            },
            {
                name: 'kimreik 6',
                rating: 760,
                isLeader: false
            },
            {
                name: 'kimreik 7',
                rating: 760,
                isLeader: false
            }
        ];

        var service = {
            players: players || [],
            maxPlayers: 10,
            getPlayers: getPlayers
        };
        return service;

        function getPlayers (id) {
            lobbyApiService.getPlayers(id).then(function (response) {
                service.players = response.data;
            });
        }
    }
})();