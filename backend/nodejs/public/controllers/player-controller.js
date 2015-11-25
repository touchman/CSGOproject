(function() {
	'use strict';
	
	angular.module('statMaster', ['ui.services'])
		   .controller('PlayerController', ['playerService', PlayerController]);
	
			function PlayerController(playerService) {
			   	var vm = this;
			   	
			   	//Sets vm.players the data obtained from REST service
			   	getPlayers();
			   	
			   	/////////////////////
			   	
			   	function getPlayers() {
			   		playerService.getPlayers().then(function(data) {
						   vm.players = data;
					});
			   	}
			}	   	
})();
