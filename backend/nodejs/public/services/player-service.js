angular.module('ui.services', [])
    .service('playerService', ['$http', function ($http) {
        return {
            getPlayers: getPlayers,
            getMatches: getMatches
        };

        function getPlayers(param) {

            return $http.get('/match/'+param)
                .then(getPlayersComplete);

            function getPlayersComplete(response) {
                return response.data;
            }

            function getPlayersFailed(error) {
                console.log('XHR Failed for getPlayers.' + error.data);
            }

        };

        function getMatches(param) {

            return $http.get('/matches/'+param)
                .then(getMatchesComplete);

            function getMatchesComplete(response) {
                return response.data;
            }

            function getMatchesFailed(error) {
                console.log('XHR Failed for getPlayers.' + error.data);
            }

        };
    }]);