angular.module('statMaster', ['statMaster.playerController', 'statMaster.playerService', 'statMaster.userController', 'statMaster.userService', 'ngRoute'])
.constant("appConfig", {
    "url": "http://localhost",
    "port": "3000"
})
.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	   .when('/register', {
	    templateUrl: 'views/register-form.html',    
	  })
	  .when('/players', {
	    templateUrl: 'views/players.html'
	  }).
	  otherwise({
	    redirectTo: '/register'
	  });	  
}]);