angular.module('ui.services', [])
  .service('playerService', ['$http', function($http) {
	  return {
		  getPlayers: getPlayers
	  };
	  
	  function getPlayers() {
		  
		  return $http.get('/players')
		  		.then(getPlayersComplete);
		  
		  function getPlayersComplete(response) {
			  return response.data;
		  }
		  
		  function getPlayersFailed(error) {
			  console.log('XHR Failed for getPlayers.' + error.data);
		  }
		  
	  };
	  
	  
  }]);