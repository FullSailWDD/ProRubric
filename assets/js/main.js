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
            .when('/addRubric', {
                templateUrl: 'views/addRubric.html',
                controller: 'secondController'
            })
            .when('/addLineItem', {
                templateUrl: 'views/addLineItem.html',
                controller: 'lineItemController'
            });
    });

//    angular.module('ProRubric').service('Degree', function () {
//        this.view = function () {
//            
//        };
//        this.save = function (degreeNew) {
//            
//        };
//        this.remove = function () {
//        };
//    });

//    angular.module('ProRubric').service('Rubric', function () {
//        this.view = function () {
//            
//        };
//        this.save = function (rubricNew) {
//            
//        };
//        this.remove = function () {
//        };
//    });


    angular.module('ProRubric').controller('mainController', function ($scope) {
        $scope.degreeAdd = function () {
            
            var degreeNew = {
                title: $scope.degreeTitle,
                acronym: $scope.degreeAcronym
            };
            
            socket.emit('add degree', degreeNew);
        };
        
        socket.once('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><img src="http://placehold.it/140x100"> <h2 class="classname">' + key.title + '</h2> <a href="#">Delete Degree</a></div>');
                });
            });
    });


    angular.module('ProRubric').controller('secondController', function ($scope) {
        
        
        $scope.rubricAdd = function () {
            var rubricNew = {
                title: $scope.rubricTitle,
                content: $scope.rubricContent
            };
            
            socket.emit('add rubric', rubricNew);
        };    
    });


    angular.module('ProRubric').controller('lineItemController', function ($scope) {
        
        
        $scope.lineItemAdd = function () {
            var lineItemNew = {
                title: $scope.itemTitle,
                content: $scope.itemContent
            };
            
            socket.emit('add lineItem', lineItemNew);
        };    
    });










