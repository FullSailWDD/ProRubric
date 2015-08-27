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


angular.module('ProRubric').factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});



angular.module('ProRubric').controller('editCourse', function ($scope, $routeParams, socket) {


    socket.emit('course req', $routeParams._id);
    socket.on('course send', function(data){
        console.log(data);
        $scope.editData = data;
    })



});

angular.module('ProRubric').controller('degreeController', function ($scope) {

    //socket.on('find degrees', function (data) {
    //    $scope.degreeView = data;
    //});
    //
    //socket.on('find course', function (data) {
    //    $scope.courseView = data;
    //});
    //
    //$scope.degreeAdd = function () {
    //    var degreeNew = {
    //        title: $scope.degreeTitle,
    //        acronym: $scope.degreeAcronym
    //    };
    //    socket.emit('add degree', degreeNew);
    //};

});



