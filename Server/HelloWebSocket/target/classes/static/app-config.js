(function () {
    angular
        .module('app.config', [
            'restangular'
        ])
        .config(config);

    config.$inject = ['RestangularProvider'];

    function config (RestangularProvider) {
        var url = 'http://127.0.0.1:8080/';
        RestangularProvider.setBaseUrl(url);
        RestangularProvider.setDefaultHeaders({
            'X-Requested-With': 'XMLHttpRequest'
        });
    }
})();