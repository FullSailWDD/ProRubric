<<<<<<< HEAD
var socket=io.connect();angular.module("ProRubric",["ngRoute"]),angular.module("ProRubric").config(["$interpolateProvider","$routeProvider",function(e,o){e.startSymbol("{[{"),e.endSymbol("}]}"),o.when("/",{templateUrl:"views/home.html",controller:"mainController"}).when("/se",{templateUrl:"views/text.html",controller:"secondController"})}]),angular.module("ProRubric").service("Degree",function(){this.view=function(){socket.once("find degrees",function(e){angular.forEach(e,function(e){$(".columns").append('<div class="pin"><p>'+e._id+" "+e.title+" "+e.acronym+"</p></div>")})})},this.save=function(e){socket.emit("add degree",e)},this.remove=function(){}}),angular.module("ProRubric").controller("mainController",["$scope","Degree",function(e,o){o.view(),e.degreeAdd=function(){var r={title:e.degreeTitle,acronym:e.degreeAcronym};o.save(r)}}]),angular.module("ProRubric").controller("secondController",function(){});
=======
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
>>>>>>> a6eb3c47d7593130690e9b51f166216c77bf17ce
