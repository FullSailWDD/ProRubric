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
            .when('/se', {
                templateUrl: 'views/text.html',
                controller: 'secondController'
            })

            .when('/addSection',{
            templateUrl: 'views/addSection.html',
            controller: 'secondController'
        })
            .when('/addLineItem', {
                templateUrl: 'views/addLineItem.html',
                controller: 'lineItemController'
            });
    });

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

    angular.module('ProRubric').controller('sectionController', function ($scope) {

        $scope.addSection = function () {
            var sectionNew = {
                title: $scope.sectionTitle,
                gradeWeight: $scope.gradeWeights
            };
            socket.emit('add section',sectionNew);
        };

    });

    angular.module('ProRubric').controller('rubricController', function ($scope) {
        
        
        $scope.rubricAdd = function () {
            var rubricNew = {
                title: $scope.rubricTitle,
                content: $scope.rubricContent
            };
            
            socket.emit('add rubric', rubricNew);
        }

        $scope.editRubric = function (rubricId){
           socket.emit('rubric id', rubricId);
            socket.on('edit rubric',function (data){

                console.log(data);

            })

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