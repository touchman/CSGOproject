angular.module('statMaster', ['statMaster.playerController', 'statMaster.playerService','statMaster.matchService', 'statMaster.matchController',
    'statMaster.userController', 'statMaster.userService', 'statMaster.serverController', 'statMaster.serverService', 'ngStorage', 'ngRoute'])
    .constant("appConfig", {
        "url": "http://localhost",
        "port": "3000"
    })
    .config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/register', {
                templateUrl: 'views/register-form.html'
            })
            .when('/players', {
                templateUrl: 'views/players.html'
            })
            .when('/match/:matchId', {
                templateUrl: 'views/players.html',
                controller: 'PlayerController'
            })
            .when('/server', {
                templateUrl: 'views/add-server.html',
                controller: 'ServerController'
            })
            .when('/matches', {
                templateUrl: 'views/matches.html',
                controller: 'MatchController'
            }).
            otherwise({
                redirectTo: '/register'
            });

        $httpProvider.interceptors.push(['$localStorage', function ($localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token)
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;

                    return config;
                },
            };
        }]);


    }]);
