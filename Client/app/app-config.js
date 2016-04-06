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
        var url = 'http://192.168.2.33:8090/';
        RestangularProvider.setBaseUrl(url);
        RestangularProvider.setDefaultHeaders({
            'X-Requested-With': 'XMLHttpRequest'
        });
    }
})();


var ROUTE_REQUIRES = {
    AUTH: 'AUTH',
    SOCKET: 'SOCKET',
    ROOM: 'ROOM',
    NOTIFICATION: 'NOTIFICATION'
};
