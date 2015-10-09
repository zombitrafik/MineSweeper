var GameConfigService = function () {

    this.CONFIG = {
        PADDINGS : {
            TOP: 10,
            LEFT: 10,
            RIGHT: 10,
            BOTTOM: 10
        },
        CELL: {
            SIZE : 20,
            PADDINGS: 2
        }
    };

    this.getWidth = function (size) {
        return size * (this.CONFIG.CELL.SIZE + this.CONFIG.CELL.PADDINGS) + (this.CONFIG.PADDINGS.LEFT + this.CONFIG.PADDINGS.RIGHT);
    };

    this.getHeight = function (size) {
        return size * (this.CONFIG.CELL.SIZE + this.CONFIG.CELL.PADDINGS) + (this.CONFIG.PADDINGS.TOP + this.CONFIG.PADDINGS.BOTTOM);
    };
};

GameConfigService.$inject = [];
app.service('GameConfigService', GameConfigService);