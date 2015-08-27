var socket = io.connect();

angular.module('ProRubric', ['ngRoute', 'ngTagsInput']);
angular.module('ProRubric').config(function ($interpolateProvider, $routeProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
        .when('/addRubric', {
            templateUrl: 'views/addRubric.html',
            controller: 'rubricController'
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


angular.module('ProRubric').controller('rubricController', function ($scope) {


    $scope.rubricAdd = function () {

        var gradeTierArray = [];

        angular.forEach($scope.tags, function (value, index) {
            array.push(Number(value.text));
        })



        var rubricNew = {
            title: $scope.rubricTitle,
            content: $scope.rubricContent,
            gradeTiers: gradeTierArray

        };

        console.log(gradeTierArray);

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