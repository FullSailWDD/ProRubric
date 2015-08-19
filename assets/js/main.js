//Global App name is ProRubric
var appModule = angular.module('ProRubric', []);

//Required to remove the conviction between Handlebars and Angular.
appModule.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

appModule.controller('mainController', function($scope) {

    $scope.addDegree = function(degreeName, degreeAcronym){
        console.log('Degree Name: ', degreeName);
        console.log('Degree Acronym: ', degreeAcronym);
    }


});