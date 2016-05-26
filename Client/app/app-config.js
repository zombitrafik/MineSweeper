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
        //var url = 'http://192.168.2.33:8090/';
        var url = 'http://localhost:8080/';
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


var ERRORS_KEYS = {
    USERNAME_ALREADY_EXIST: 'Username already exist',
    PASSWORDS_DONT_MATCH: 'Passwords doesn\'t match',
    WRONG_USERNAME_OR_PASSWORD: 'Wrong username or password',
    ROOM_MIN_RATING_MUST_BE_LOWER_THAN_LEADER_RATING: 'Room min rating must be lower than leader rating',
    USER_ALREADY_IN_SOME_ROOM: 'User already in some room',
    ROOM_WITH_THIS_NAME_ALREADY_EXIST: 'Room with this name already exist',
    ROOM_IS_TOO_EASY: 'Room is too easy',
    ROOM_IS_TOO_HARD: 'Room is too hard'
};