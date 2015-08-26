var socket = io.connect();

angular.module('ProRubric', ['ngRoute', 'ngTagsInput']);
    angular.module('ProRubric').config(function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $routeProvider
            .when('/', {
                templateUrl: 'views/addDegree.html',
                controller: 'degreeController'
            })
            .when('/course', {
                templateUrl: 'views/addCourse.html',
                controller: 'courseController'
            })
            .otherwise({
                redirect: '/'
            });
    });



    angular.module('ProRubric').controller('degreeController', function ($scope) {

        $scope.$on('$viewContentLoaded', function (event) {
            socket.on('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><img src="/img/noimage.gif"><h2 class="classname">' + key.title + '</h2></div>');
                });
            });
        })
        $scope.degreeAdd = function () {
            var degreeNew = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            socket.emit('add degree', degreeNew);

        };

        $scope.deleteDegree = function(){
            socket.on('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><img src="/img/noimage.gif"><h2 class="classname">' + key.title + '</h2></div>');
                });
            });


        }


    });

    angular.module('ProRubric').controller('courseController', function ($scope) {

        socket.on('find course', function (data) {
            console.log(data);
            angular.forEach(data, function (key) {
                $('.columns').append('<div class="pin"><img src="/img/noimage.gif"><h2 class="classname">' + key.title + '</h2></div>');
            });
        });
        $scope.courseAdd = function () {
            var courseNew = {
                title: $scope.courseTitle,
                acronym: $scope.courseAcronym,
                description : $scope.courseDescription
            };
            socket.emit('add course', courseNew);

            window.location = '#/course';
        };

    })



