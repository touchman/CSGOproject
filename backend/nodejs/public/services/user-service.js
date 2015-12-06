(function() {
	'use strict';
	
	angular.module('statMaster.userService', [])
	  .service('userService', ['$http', 'appConfig', function userService($http, appConfig) {
		  return {
			  saveUser: saveUser
		  };
		  
		  function saveUser(user) {
			  console.log(appConfig.url + ':' + appConfig.port + '/api/signin');
			  
			  return $http.post(appConfig.url + ':' + appConfig.port + '/api/signin', user);
			  
			  function saveUserComplete(response) {
				  return response;
			  }
			  
			  function saveUserFailed(error) {
				  console.log('XHR Failed for getPlayers.' + error.data);
			  }
			  
		  };
	  }]);
})();