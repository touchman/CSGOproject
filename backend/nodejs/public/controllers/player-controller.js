var statMaster = angular.module('statMaster', ['ui.services','ngRoute', 'ngResource']);

statMaster.controller('PlayerController', ['playerService','$location', '$routeParams', function(playerService, $location, $routeParams) {
		   	console.log("Hello World from controller");
		   	var vm = this;
		   	
		   	//Sets vm.players the data obtained from REST service
		   	getPlayers($routeParams.matchId);
		   	
		   	////////////////////

		   	function getPlayers(param) {
		   		playerService.getPlayers(param).then(function(data) {
					   vm.players = data;
				});
		   	}
}]);

statMaster.config(['$routeProvider', '$locationProvider', function ($routeProvide, $locationProvider) {
    $routeProvide
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .when('/match/:matchId', {
            templateUrl: 'players.html',
            controller: 'PlayerController'
        })
        .when('/listen', {
            templateUrl: 'listen.html',
            controller: 'ListenController'
        })
        .when('/matches/:matchId', {
            templateUrl: 'matches.html',
            controller: 'MatchController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

statMaster.controller('MatchController', ['playerService','$location', '$routeParams',  function(playerService, $location, $routeParams) {
    console.log("Hello World from controller");
    var vm = this;

    //Sets vm.players the data obtained from REST service
    getMatches($routeParams.matchId);

    ////////////////////

    function getMatches(param) {
        playerService.getMatches(param).then(function(data) {
            vm.matches = data;
        });
    }
}]);

statMaster.controller('HomeController', ['playerService', function(playerService){

}]);

statMaster.controller('ListenController', ['playerService', function(playerService){

}]);