(function() {
	'use strict';
	
	angular.module('statMaster.playerService', [])
	  .service('playerService', ['$http', 'appConfig', function playerService($http, appConfig) {
		  return {
			  getPlayers: getPlayers
		  };
		  
		  function getPlayers() {
			  
			  //return $http.get('http://localhost:3000/players')
			  return $http.get(appConfig.url + ':' + appConfig.port + '/api/players')
			  		.then(getPlayersComplete).catch(getPlayersFailed);
			  
			  function getPlayersComplete(response) {
				  return response.data;
			  }
			  
			  function getPlayersFailed(error) {
				  console.log('XHR Failed for getPlayers.' + error.data);
			  }
			  
		  };
	  }]);
})();angular.module('ui.services', [])
    .service('playerService', ['$http', function ($http) {
        return {
            getPlayers: getPlayers,
            getMatches: getMatches,
            getUdp: getUdp
        };

        function getPlayers(param) {

            return $http.get('/match/'+param)
                .then(getPlayersComplete);

            function getPlayersComplete(response) {
                return response.data;
            }

            function getPlayersFailed(error) {
                console.log('XHR Failed for getPlayers.' + error.data);
            }

        };

        function getMatches(param) {

            return $http.get('/matches/'+param)
                .then(getMatchesComplete);

            function getMatchesComplete(response) {
                return response.data;
            }

            function getMatchesFailed(error) {
                console.log('XHR Failed for getMatches.' + error.data);
            }
        };

        function getUdp() {

            return $http.get('/listen')
                .then(getUdpComplete);

            function getUdpComplete(response) {
                return response.data;
            }

            function getUdpFailed(error) {
                console.log('XHR Failed for getMatches.' + error.data);
            }
        };
    }]);