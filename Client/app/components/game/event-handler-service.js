(function () {
    angular
        .module('app')
        .service('eventHandlerService', eventHandlerService);

    eventHandlerService.$inject = ['gameApiService', 'socketService', '$q'];

    function eventHandlerService (gameApiService, socketService, $q) {
        var service = {
            info: {},
            setFlag: setFlag,
            openCell: openCell,
            ACTIONS: {
                CLICK: 'click',
                CONTEXTMENU: 'contextmenu'
            }
        };



        return service;

        function init (info, id) {
            for(var k in info) {
                service.info[k] = info[k];
            }
        }

        function setFlag (cell) {
            var data = {x: cell.x, y: cell.y};/*
            var promise = gameApiService.setFlag(data);
            return promise;*/
            /*
            //var roomId = service.info.room.id;
            var roomId = 1;
            gameApiService.setFlag(data, roomId).then(function (response) {

            });*/
            socketService.send('/test/right', data)
        }

        function openCell (cell) {
            var data =  {x: cell.x, y: cell.y};/*
            var promise = gameApiService.openCell(data);
            return promise;*/
            /*var data =  [{x: cell.i, y: cell.j}];
            //var roomId = service.info.room.id;
            var roomId = 1;
            gameApiService.openCell(data, roomId).then(function (response) {
                updateMap(response);
            });*/
            socketService.send('/test/left', data);
        }


    }
})();