(function() {
    'use strict';

    angular.module('statMaster.matchController', [])
        .controller('MatchController', ['matchService', '$http', 'appConfig',  function (matchService, $http, appConfig) {
            console.log("Hello World from controller");
            var vm = this;

            //Sets vm.players the data obtained from REST service
            getMatches();

            ////////////////////

            function getMatches() {
                matchService.getMatches().then(function (data) {
                    vm.matches = data.data;
                    console.log(data)
                });
            }

            vm.remove = function (id) {
                console.log(id);
                $http.delete(appConfig.url + ':' + appConfig.port + '/api/matches/' + id).success(function (response) {
                    vm.refresh();
                })
            };

            vm.refresh = function () {
                getMatches();
            };

            ////////////////////
        }]);
})();