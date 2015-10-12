(function () {
    angular
        .module('app')
        .service('gameService', gameService);

    gameService.$inject = ['gameConfigService', 'gameApiService'];

    function gameService (gameConfigService, gameApiService) {
        var service = {
            generateMap: generateMap,
            updateMap: updateMap,
            setFlag: setFlag,
            open: open,
            map: [],
            setRoom: setRoom
        };

        return service;

        function generateMap (rows, cols) {
            var map = [];
            for(var i = 0; i < rows; i++) {
                map[i] = [];
                for(var j = 0; j < cols; j++) {
                    map[i][j] = getCell(i, j);
                }
            }
            service.map = map;
            return map;
        }

        function getCell (x, y) {
            return {
                x: x,
                y: y,
                number: 'C'
            }
        }

        function updateMap (data) {
            var map = service.map;
            data.forEach(function (cell) {
                map[cell.x][cell.y].number = cell.value;
            });
        }

        function setFlag (cell) {
            var data = {x: cell.x, y: cell.y};
            var roomId = service.room.id;
            gameApiService.setFlag(data, roomId).then(function (response) {

            });
        }

        function open (cell) {
            var data =  {x: cell.x, y: cell.y};
            var roomId = service.room.id;
            gameApiService.openCell(data, roomId).then(function (response) {
                updateMap(response);
            });
        }

        function setRoom (room) {
            service.room = room;
            var field = service.room.mineField;
            generateMap(field.width, field.height);
            updateMap(field.openedField);
        }
    }
})();
