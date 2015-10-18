(function () {
    angular
        .module('app')
        .service('spriteService', spriteService);

    spriteService.$inject = ['$q', 'storageService'];

    function spriteService ($q, storageService) {
        var service = {
            Sprite: Sprite
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

    Image.prototype.split = function (config, keys) {
        var images = [];
        var fakeCanvas = angular.element('<canvas width="' + this.width + '" height="' + this.height +'"></canvas>');
        var ctx = fakeCanvas[0].getContext('2d');
        ctx.drawImage(this, 0, 0, this.width, this.height);
        for(var k in config) {
            images[k] = [];
            var key = keys[k];
            for(var img in config[k]) {
                var imgConf = config[k][img];
                var image = ctx.getImageData(imgConf.x, imgConf.y, 32, 32);
                for(var sc in imgConf) {
                    image[sc] = imgConf[sc];
                }
                if(key !== null) {
                    images[k][imgConf[key]] = image;
                } else {
                    images[k].push(image);
                }
            }
        }
        return images;
    };
})();
