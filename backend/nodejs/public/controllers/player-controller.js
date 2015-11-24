angular.module('statMaster', ['ui.services'])
	   .controller('PlayerController', ['playerService', function(playerService) {
		   	console.log("Hello World from controller");
		   	var vm = this;
		   	
		   	//Sets vm.players the data obtained from REST service
		   	getPlayers();
		   	
		   	
		   	/////////////////////
		   	
		   	function getPlayers() {
		   			playerService.getPlayers().then(function(data) {
					   	vm.players = data;
					});
		   	}
}]);

