var socket = io.connect();

//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})
.service('Degree', function degree(){

    this.save = function(degreeSave){
        socket.emit('add degree', degreeSave);
    };
    this.remove = function(){

    };

})
.controller('mainController', function($scope, Degree) {
    $scope.degreeAdd = function(){
        var degreeSave = {
            title: $scope.degreeTitle,
            acronym: $scope.degreeAcronym
        };
        Degree.save(degreeSave);
    };

});

