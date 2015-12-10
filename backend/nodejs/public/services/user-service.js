(function() {
	'use strict';
	
	angular.module('statMaster.userService', [])
	  .service('userService', ['$http', 'appConfig', '$localStorage', function userService($http, appConfig, $localStorage) {
		  return {
			  saveUser: saveUser,
			  authUser: authUser,
			  me: me,
			  getToken: getToken,
			  setCurrUser: setCurrUser,
			  getCurrUser: getCurrUser,
			  logOut: logOut
		  };
		  
		  function logOut() {
			  $localStorage.$reset();
		  }
		  
		  function setCurrUser(user) {
			  $localStorage.name = user.name;
		  }
		  
		  function getCurrUser() {		  
			  return $localStorage.name;
		  }
		  
		  function getToken() {
			  return $localStorage.token;
		  }
		  
		  function me() {
			  if ($localStorage.token) {
				  return $http.get(appConfig.url + ':' + appConfig.port + '/api/me')
			  		.then(ensureAuthUserComplete).catch(ensureAuthUserFailed);
			  }
		  
			  function ensureAuthUserComplete(response) {
				  console.log(response);
				  
				  return response;
			  }
			  
			  function ensureAuthUserFailed(error) {
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