var GameService = function (GameConfigService) {

    var config = GameConfigService.CONFIG
    var self = this;

    this.init = function (config) {
        for(var k in config) {
            this[k] = config[k];
        }
    };

    this.draw = function (n, m) {
        for(var i = 0; i < n; i++) {
            for(var j = 0; j < m; j++) {
                this.createCell(i, j);
            }
        }
    };

    this.createCell = function (i, j) {
        this.g.append('rect')
            .attr('width', config.CELL.SIZE)
            .attr('height', config.CELL.SIZE)
            .attr('transform', 'translate(' + (config.CELL.SIZE + config.CELL.PADDINGS) * i + ', ' + (config.CELL.SIZE + config.CELL.PADDINGS) * j + ')')
            .attr('id', parseInt(i + '' +  j))
            .on('click', function () {
                self.openCell(this.id);
            })
            .on('contextmenu', function (){
                self.setFlag(this.id);
            });
    };

    this.openCell = function (id) {

    };

    this.setFlag = function (id) {

    };

};

GameService.$inject = ['GameConfigService'];
app.service('GameService', GameService);