(function () {
    'use strict';

    angular.module('statMaster.playerService', [])
        .service('playerService', ['$http', 'appConfig', function playerService($http, appConfig) {
            return {
                getPlayers: getPlayers
            };

            function getPlayers(param) {

                //return $http.get('http://localhost:3000//api/match/:id')
                return $http.get(appConfig.url + ':' + appConfig.port + '/api/match/' + param)
                    .then(getPlayersComplete).catch(getPlayersFailed);

                function getPlayersComplete(response) {
                    return response.data;
                }

                function getPlayersFailed(error) {
                    console.log('XHR Failed for getPlayers.' + error.data);
                }

            };
        }]);
})();