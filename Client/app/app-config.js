(function () {
    angular
        .module('app.config', [
            'restangular'
        ])
        .config(config);

    config.$inject = ['RestangularProvider'];

    function config (RestangularProvider) {
        var url = 'http://52.28.17.161:8080/';
        RestangularProvider.setBaseUrl(url);
    }
})();