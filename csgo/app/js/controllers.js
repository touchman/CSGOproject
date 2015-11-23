'use strict';

/* Controllers */
var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

phonecatApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
  $routeProvide
      .when('/',{
        templateUrl:'template/home.html',
        controller:'PhoneListCtrl'
      })
      .when('/csgo', {
        templateUrl:'template/csgo.html',
        controller:'CsgoCtrl'
      })
      .when('/startpage', {
        templateUrl:'template/startpage.html',
        controller:'StartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);

/* Filter */
phonecatApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
});

//About Controller
phonecatApp.controller('AboutCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
//Contact Controller
phonecatApp.controller('ContactCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);

phonecatApp.controller('CsgoCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('json/dataOut.json').success(function(data){
        $scope.players = data;
    })
}]);

phonecatApp.controller('StartCtrl', ['$scope', '$http', function($scope, $http){

}]);


