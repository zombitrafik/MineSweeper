'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});

    $routeProvider.when('/game', {
        templateUrl: 'components/game/game-index.html',
        controller: 'GameController'
    });
}]);
