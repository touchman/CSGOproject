var statMaster = angular.module('statMaster', ['ui.services', 'ngRoute', 'ngResource']);

statMaster.controller('PlayerController', ['playerService', '$location', '$routeParams', '$filter',  function (playerService, $location, $routeParams, $filter) {
    console.log("Hello World from controller");
    var vm = this;

    var orderBy = $filter('orderBy');

    //Sets vm.players the data obtained from REST service
    getPlayers($routeParams.matchId);

    ////////////////////

    function getPlayers(param) {
        playerService.getPlayers(param).then(function (data) {
            vm.players = data[0].match;
        });
    }

    vm.order = function(predicate, reverse){
        vm.players = orderBy(vm.players, predicate, reverse);
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
        .when('/matches/:matchId', {
            templateUrl: 'matches.html',
            controller: 'MatchController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

statMaster.controller('MatchController', ['playerService', '$location', '$routeParams', '$http', function (playerService, $location, $routeParams, $http) {
    console.log("Hello World from controller");
    var vm = this;

    //Sets vm.players the data obtained from REST service
    getMatches($routeParams.matchId);

    ////////////////////

    function getMatches(param) {
        playerService.getMatches(param).then(function (data) {
            vm.matches = data;
        });
    }

    vm.remove = function (id) {
        console.log(id);
        $http.delete('/matches/' + id).success(function (response) {
            vm.refresh();
        })
    };

    vm.refresh = function () {
        getMatches($routeParams.matchId);
    };

    vm.getServer = function(){
        getUdp();
    };

    ////////////////////

    function getUdp() {
        playerService.getUdp().then(function (data) {
            vm.udp = data;
        });
    }
}]);

statMaster.controller('HomeController', ['playerService', function (playerService) {

}]);

statMaster.controller('ListenController', ['playerService', function (playerService) {
}]);