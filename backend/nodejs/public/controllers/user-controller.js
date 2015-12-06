(function() {
	'use strict';
	
	angular.module('statMaster.userController', [])
		   .controller('UserController', ['$http', 'userService', function UserController($http, userService) {
			   	var vm = this;
					   	
			   	
			   	/////////////////////
			   	this.submitForm = function(isValid) {			
			   		if (isValid) {
			   			console.log(vm.user);
			   			userService.saveUser(vm.user).then(function(response) {
				   			console.log(response);
				   		});
			   		}
			   	}
			   	
			}]);	   	
})();
