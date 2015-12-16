(function() {
    'use strict';

    angular.module('statMaster.serverController', [])
        .controller('ServerController', ['serverService', '$http', 'appConfig',  function (serverService, $http, appConfig) {
            console.log("Hello World from controller");
            var vm = this;

            ////////////////////

            getServers();

            vm.getServerInfo = function(server){
                getUdp(server);
            };

            vm.start = function(server){
                startServer(server);
            };


            vm.remove = function (id) {
                console.log(id);
                $http.delete(appConfig.url + ':' + appConfig.port + '/api/server/' + id).success(function (response) {
                    vm.refresh();
                })
            };

            vm.refresh = function () {
                getServers();
            };

            ////////////////////

            function getUdp(server) {
                serverService.getUdp(server).then(function (data) {
                    vm.udp = data;
                    console.log(data)
                });
            }

            function getServers() {
                serverService.getServers().then(function (data) {
                    vm.servers = data.data;
                    console.log(data.data)
                });
            }
            function startServer(server) {
                serverService.startServer(server).then(function (data) {
                    vm.udp = data;
                    console.log(data)
                });
            }
        }]);
})();