var socket = io.connect();

angular.module('ProRubric', ['ngRoute'])
    .config(function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $routeProvider
            .when('/mike', {
                templateUrl: 'views/addInfo.html',
                controller: 'secondController'
            })
            .when('/mikewazhere', {
                templateUrl: 'views/addInfo.html',
                controller: 'secondController'
            })
    })
    .service('Degree', function () {
        this.view = function () {
            socket.once('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><p>' + key._id + ' ' + key.title + ' ' + key.acronym + '</p></div>');
                });
            });
        };
        this.save = function (degreeNew) {
            socket.emit('add degree', degreeNew);
        };
        this.remove = function () {
        };
    })


    .controller('mainController', function ($scope, Degree) {
        //Main Route Loading Point Start
        Degree.view();
        //Main Route Loading Point End

        $scope.degreeAdd = function () {
            var degreeNew = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            Degree.save(degreeNew);
        };


    })
    .controller('secondController', function () {


    });
