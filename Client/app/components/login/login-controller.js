var LoginController = function () {
    this.login = function () {
        alert('123');
    }
};

LoginController.$inject = [];
app.controller('LoginController', LoginController);