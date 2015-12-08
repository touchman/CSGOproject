angular.module('statMaster', ['statMaster.playerController', 'statMaster.playerService', 'statMaster.userController', 'statMaster.userService', 
                              'ngStorage', 'ngRoute'])
.constant("appConfig", {
    "url": "http://localhost",
    "port": "3000"
})
.config(['$routeProvider', '$httpProvider',  function($routeProvider, $httpProvider) {
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
	  
	  $httpProvider.interceptors.push(['$localStorage', function($localStorage) {
		    return {
		        'request': function (config) {
		            config.headers = config.headers || {};
		            if ($localStorage.token) 
		                config.headers.Authorization = 'Bearer ' + $localStorage.token;
		            
		            return config;
		        },
		    };
		}]);
	  
	  
	  
}]);
