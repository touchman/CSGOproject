(function () {
    'use strict';

    angular.module('statMaster.serverService', [])
        .service('serverService', ['$http', 'appConfig', function serverService($http, appConfig) {
            return {
                getUdp: getUdp,
                getServers: getServers,
                startServer: startServer
            };


            function getUdp(server) {

                return $http.post(appConfig.url + ':' + appConfig.port + '/api/server/', server)
                    .then(getUdpComplete);

                function getUdpComplete(response) {
                    return response.data;
                }

                function getUdpFailed(error) {
                    console.log('XHR Failed for getMatches.' + error.data);
                }
            };

            function getServers() {

                return $http.get(appConfig.url + ':' + appConfig.port + '/api/servers/')
                    .then(getServersComplete);

                function getServersComplete(response) {
                    return response.data;
                }

                function getServersFailed(error) {
                    console.log('XHR Failed for getMatches.' + error.data);
                }
            };
            function startServer(server) {

                return $http.post(appConfig.url + ':' + appConfig.port + '/api/start/', server)
                    .then(startServerComplete);

                function startServerComplete(response) {
                    return response.data;
                }

                function startServerFailed(error) {
                    console.log('XHR Failed for getMatches.' + error.data);
                }
            };
        }]);
})();