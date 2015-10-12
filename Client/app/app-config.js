(function () {
    angular
        .module('app.config', [
            'restangular'
        ])
        .config(config);

    config.$inject = ['RestangularProvider'];

    function config (RestangularProvider) {
        var url = 'http://169.254.130.181:8080/';
        RestangularProvider.setBaseUrl(url);
    }
})();