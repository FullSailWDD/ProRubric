<<<<<<< HEAD
angular.module('ProRubric', [])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    })
    .controller('mainController', function($http) {
        var rubricFunction = function(rubricName){
            $http.get('/degProcess'+rubricName, {msg: rubricName}).
                then(function(response) {
                }, function(response) {
                });
        };
    });
=======
var socket=io.connect();angular.module("ProRubric",["ngRoute"]),angular.module("ProRubric").config(["$interpolateProvider","$routeProvider",function(e,o){e.startSymbol("{[{"),e.endSymbol("}]}"),o.when("/",{templateUrl:"views/home.html",controller:"secondController"}).when("/mikewazhere",{templateUrl:"views/addInfo.html",controller:"secondController"}).when("/se",{templateUrl:"views/text.html",controller:"secondController"})}]),angular.module("ProRubric").service("Degree",function(){this.view=function(){socket.once("find degrees",function(e){angular.forEach(e,function(e){$(".columns").append('<div class="pin"><img src="http://placehold.it/140x100"> <h2 class="classname">'+e.title+'</h2> <a href="#">Delete Degree</a></div>')})})},this.save=function(e){socket.emit("add degree",e)},this.remove=function(){}}),angular.module("ProRubric").controller("mainController",["$scope","Degree",function(e,o){o.view(),e.degreeAdd=function(){var r={title:e.degreeTitle,acronym:e.degreeAcronym};o.save(r)}}]),angular.module("ProRubric").controller("secondController",function(){});
>>>>>>> 8b0ba6ad646825ce6961ef4f32ef39229d4dbae5
