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
            .when('/editCourse/:_id', {
                templateUrl: 'views/editCourse.html',
                controller: 'editCourse'
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


    angular.module('ProRubric').factory('SocketeerGetters', function (){
        var course = {
          get: function(socket){
              socket.on('course send', function(payload){
                  console.log(payload);
              });

          }
        };
        return {
            get: function(){
                socket.on('course send', function(payload){
                    console.log(payload);
                });
                return course.get
            }
        };
    });

    angular.module('ProRubric').factory('SocketeerSetters', function (){
       var course = {
           query: function(_id, getter){
               socket.emit('course req', {_id: _id});
           }
       };

        return {
            query: course.query
        }
    });

angular.module('ProRubric').controller('editCourse', function ($scope, $routeParams, SocketeerGetters, SocketeerSetters) {
    //socket.emit('course req', $routeParams.id);
    SocketeerSetters.query($routeParams._id);
    SocketeerGetters.get(socket.on);

    //socket.on('course send', function (data) {
    //    console.log(data);
    //    $scope.editData = data;
    //});

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

    });


