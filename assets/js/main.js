var socket = io.connect();

angular.module('ProRubric', ['ngRoute']);
    angular.module('ProRubric').config(function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'secondController'
            })
            .when('/mikewazhere', {
                templateUrl: 'views/addInfo.html',
                controller: 'secondController'
            })
            .when('/se', {
                templateUrl: 'views/text.html',
                controller: 'secondController'
            });
    });

    angular.module('ProRubric').service('Degree', function () {
        this.view = function () {
            socket.once('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><img src="http://placehold.it/140x100"> <h2 class="classname">' + key.title + '</h2> <a href="#">Delete Degree</a></div>');
                });
            });
        };
        this.save = function (degreeNew) {
            socket.emit('add degree', degreeNew);
        };
        this.remove = function () {
        };
    });


    angular.module('ProRubric').controller('mainController', function ($scope, Degree) {
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
    });
    angular.module('ProRubric').controller('secondController', function () {

    })

