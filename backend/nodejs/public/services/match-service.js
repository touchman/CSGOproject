(function () {
    'use strict';

    angular.module('statMaster.matchService', [])
        .service('matchService', ['$http', 'appConfig', function matchService($http, appConfig) {
            return {
                getMatches: getMatches,
                getUdp: getUdp
            };


            function getMatches() {

                return $http.get(appConfig.url + ':' + appConfig.port + '/api/matches/')
                    .then(getMatchesComplete);

                function getMatchesComplete(response) {
                    return response.data;
                }

                function getMatchesFailed(error) {
                    console.log('XHR Failed for getMatches.' + error.data);
                }
            };

            function getUdp() {

                return $http.get(appConfig.url + ':' + appConfig.port + '/api/listen')
                    .then(getUdpComplete);

                function getUdpComplete(response) {
                    return response.data;
                }

                function getUdpFailed(error) {
                    console.log('XHR Failed for getMatches.' + error.data);
                }
            };
        }]);
})();