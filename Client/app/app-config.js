(function () {
    angular
        .module('app.config', [
            'restangular'
        ])
        .config(config);

    config.$inject = ['RestangularProvider'];

    function config (RestangularProvider) {
        //var url = 'http://169.254.130.181:8080/';
        //var url = '/';
        var url = 'http://192.168.2.33:8080/';
        RestangularProvider.setBaseUrl(url);
        RestangularProvider.setDefaultHeaders({
            'X-Requested-With': 'XMLHttpRequest'
        });
    }
})();


var ROUTE_REQUIRES = {
    AUTH: 'AUTH',
    ROOM: 'ROOM',
    SOCKET: 'SOCKET',
    NOTIFICATION: 'NOTIFICATION'
};
