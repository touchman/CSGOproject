(function() {
	'use strict';
	
	angular.module('statMaster.userService', [])
	  .service('userService', ['$http', 'appConfig', function userService($http, appConfig) {
		  return {
			  saveUser: saveUser,
			  authUser: authUser
		  };
		  
		  function authUser(user) {
			  console.log(user);
			  
			  return $http.post(appConfig.url + ':' + appConfig.port + '/api/authenticate', user)
		  		.then(authUserComplete).catch(authUserFailed);
		  
			  function authUserComplete(response) {
				  return response;
			  }
			  
			  function authUserFailed(error) {
				  console.log('XHR Failed for authUser.' + error.data);
			  }
			  
		  }
		  
		  function saveUser(user) {
			  console.log(appConfig.url + ':' + appConfig.port + '/api/signin');
			  
			  return signIn(user).then(function(res) {
				  console.log('response ', res);
				  if (res.data.type == false)
					  console.log('already exists');
			  });
			  
		  };
		  
		  function signIn(user) {
			  return $http.post(appConfig.url + ':' + appConfig.port + '/api/signin', user)
			  		.then(saveUserComplete).catch(saveUserFailed);
			  
			  function saveUserComplete(response) {
				  return response;
			  }
			  
			  function saveUserFailed(error) {
				  console.log('XHR Failed for saveUser.' + error.data);
			  }
		  }
		  
		  
		  
	  }]);
})();