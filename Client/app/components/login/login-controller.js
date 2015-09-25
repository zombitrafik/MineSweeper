var LoginController = function (LoginService, $state) {
    this.login = function () {
        $state.go('lobby');
    };
    this.register = function () {
        $state.go('register');
    };
};

LoginController.$inject = ['LoginService', '$state'];
app.controller('LoginController', LoginController);