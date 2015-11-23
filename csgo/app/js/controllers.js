'use strict';

/* Controllers */
var phonecatApp = angular.module('phonecatApp', ['ngRoute']);

phonecatApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
  $routeProvide
      .when('/',{
        templateUrl:'template/startpage.html',
        controller:'StartCtrl'
      })
      .when('/csgo', {
        templateUrl:'template/csgo.html',
        controller:'CsgoCtrl'
      })
      .when('/startpage', {
        templateUrl:'template/startpage.html',
        controller:'StartCtrl'
      })
      .when('/waiting', {
        templateUrl:'template/waiting.html',
        controller:'WaitCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);


phonecatApp.controller('CsgoCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('json/dataOut.json').success(function(data){
        $scope.players = data;
    })
}]);

phonecatApp.controller('StartCtrl', ['$scope', '$http', function($scope, $http){

}]);

phonecatApp.controller('WaitCtrl', ['$scope', '$http', function($scope, $http){

}]);


