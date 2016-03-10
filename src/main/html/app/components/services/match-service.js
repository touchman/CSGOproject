(function () {
    'use strict';

    angular.module('statMaster.matchService', [])
        .service('matchService', ['$http', 'appConfig', function matchService($http, appConfig) {
            return {
                getMatches: getMatches
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
        }]);
})();