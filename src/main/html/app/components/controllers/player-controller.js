(function () {
    'use strict';

    angular.module('statMaster.playerController', [])
        .controller('PlayerController', ['playerService', '$routeParams', '$filter', '$location', function PlayerController(playerService, $routeParams, $filter, $location) {
            var vm = this;

            var orderBy = $filter('orderBy');

            //Sets vm.players the data obtained from REST service
            console.log($routeParams.matchId);
            getPlayers($routeParams.matchId);

            ////////////////////

            function getPlayers(param) {
                playerService.getPlayers(param).then(function (data) {
                    vm.players = [];
                    for (var i = 0; i < 10; i++) {
                        vm.players.push(data[0].match[i]);
                    }
                });
            }

            vm.order = function(predicate, reverse){
                vm.players = orderBy(vm.players, predicate, reverse);
            }
        }]);
})();
