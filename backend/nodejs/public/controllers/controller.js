var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    $http.get('/players').success(function(response){
        console.log("I got a data");
        $scope.players = response;
    })
}]);

