var socket = io.connect();

//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
    .config(['$routeProvider'], function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
        $routeProvider.
            when('/phones', {
                templateUrl: 'partials/phone-list.html',
                controller: 'PhoneListCtrl'
            }).
            when('/phones/:phoneId', {
                templateUrl: 'partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            }).
            otherwise({
                redirectTo: '/phones'
            });

    })


    .service('Degree', function () {
        this.view = function(){
            socket.once('find degrees', function (data) {
                angular.forEach(data, function (key) {
                    $('.columns').append('<div class="pin"><p>'+key._id+' '+key.title+' '+ key.acronym +'</p></div>');
                });
            });
        };
        this.save = function (degreeNew) {
            socket.emit('add degree', degreeNew);
        };
        this.remove = function () {
        };
    })



    .controller('mainController', ['$scope', Degree], function ($scope, Degree) {
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

