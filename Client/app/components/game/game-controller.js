var GameController = function (GameService, GameConfigService) {

    var config = GameConfigService.CONFIG,
        n = 10,
        m = 10;
    this.draw = function () {



        var svg = d3.select('#game')
            .append('svg')
            .attr('width', GameConfigService.getWidth(n))
            .attr('height', GameConfigService.getHeight(m));

        var g = svg.append('g')
            .attr('width', config.WIDTH - (config.PADDINGS.LEFT + config.PADDINGS.RIGHT))
            .attr('height', config.HEIGHT - (config.PADDINGS.TOP + config.PADDINGS.BOTTOM))
            .attr('transform', 'translate(' + config.PADDINGS.LEFT + ',' + config.PADDINGS.TOP + ')');

        GameService.init({
            svg: svg,
            g: g
        });

        GameService.draw(n, m);
    };
};

GameController.$inject = ['GameService', 'GameConfigService'];
app.controller('GameController', GameController);