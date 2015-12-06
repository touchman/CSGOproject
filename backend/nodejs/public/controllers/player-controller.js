(function() {
	'use strict';
	
	angular.module('statMaster.playerController', [])
		   .controller('PlayerController', ['playerService', function PlayerController(playerService) {
			   	var vm = this;
			   	var players;
			   	//Sets vm.players the data obtained from REST service
			   	getPlayers();
			   	
			   	/////////////////////
			   	
			   	function getPlayers() {
			   		playerService.getPlayers().then(function(data) {
			   				var players=data;
			   				vm.players = data;
						   	console.log(data[0]);
					});
			   	}
			}]);	   	
})();
