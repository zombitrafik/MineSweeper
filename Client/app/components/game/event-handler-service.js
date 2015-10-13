(function () {
    angular
        .module('app')
        .service('eventHandlerService', eventHandlerService);

    eventHandlerService.$inject = ['gameApiService', 'socketService'];

    function eventHandlerService (gameApiService, socketService) {
        var service = {
            info: {},
            setFlag: setFlag,
            openCell: openCell
        };
        return service;

        function init (info) {
            for(var k in info) {
                service.info[k] = info[k];
            }
        }

        function setFlag (cell) {
            /*var data = {x: cell.i, y: cell.j};
            //var roomId = service.info.room.id;
            var roomId = 1;
            gameApiService.setFlag(data, roomId).then(function (response) {

            });*/
        }

        function openCell (cell) {
            /*var data =  [{x: cell.i, y: cell.j}];
            //var roomId = service.info.room.id;
            var roomId = 1;
            gameApiService.openCell(data, roomId).then(function (response) {
                updateMap(response);
            });*/
        }


    }
})();