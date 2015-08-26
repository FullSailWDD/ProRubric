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

        socket.on('find degrees', function (data) {
                $scope.degreeView = data;
        });

        socket.on('find course', function (data) {
                $scope.courseView = data;
        });

        $scope.degreeAdd = function () {
            var degreeNew = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            socket.emit('add degree', degreeNew);
        };



    });

    angular.module('ProRubric').controller('courseController', function ($scope) {

        $scope.courseAdd = function () {
            var courseNew = {
                title: $scope.courseTitle,
                acronym: $scope.courseAcronym,
                description : $scope.courseDescription
            };
            socket.emit('add course', courseNew);
        };

    })



