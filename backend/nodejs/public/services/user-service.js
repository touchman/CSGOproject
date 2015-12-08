(function() {
	'use strict';
	
	angular.module('statMaster.userService', [])
	  .service('userService', ['$http', 'appConfig', '$localStorage', function userService($http, appConfig, $localStorage) {
		  return {
			  saveUser: saveUser,
			  authUser: authUser,
			  me: me
		  };
		  
		  function me() {
			  return $http.get(appConfig.url + ':' + appConfig.port + '/api/me')
		  		.then(authUserComplete).catch(authUserFailed);
		  
			  function authUserComplete(response) {
				  console.log(response);
				  
				  return response;
			  }
			  
			  function authUserFailed(error) {
				  console.log('XHR Failed for authUser.' + error.data);
			  } 
		  }
		  
		  function authUser(user) {
			  console.log(user);
			  
			  return $http.post(appConfig.url + ':' + appConfig.port + '/api/authenticate', user)
		  		.then(authUserComplete).catch(authUserFailed);
		  
			  function authUserComplete(response) {
				  $localStorage.token = response.data.token;
				  
				  console.log($localStorage.token);
				  
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