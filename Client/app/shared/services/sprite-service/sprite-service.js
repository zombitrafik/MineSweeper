(function () {
    angular
        .module('app')
        .service('spriteService', spriteService);

    spriteService.$inject = ['$q'];

    function spriteService ($q) {
        var service = {
            Sprite: Sprite,
            sprites: []
        };

        return service;

        function Sprite (url) {
            var deffered = $q.defer();
            var image = new Image();
            image.src = url;
            image.onload = function() {
                deffered.resolve(image);
            };
            return deffered.promise;
        }
    }

    Image.prototype.split = function (config) {
        var images = [];
        var fakeCanvas = angular.element('<canvas width="' + this.width + '" height="' + this.height +'"></canvas>');
        var ctx = fakeCanvas[0].getContext('2d');
        ctx.drawImage(this, 0, 0, this.width, this.height);

        for(var k in config) {
            images[k] = [];
            for(var img in config[k]) {
                var imgConf = config[k][img];
                var image = ctx.getImageData(imgConf.x, imgConf.y, 32, 32);
                images[k].push(image);
            }
        }
        return images;
    };
})();
