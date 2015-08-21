//Global App name is ProRubric
angular.module('ProRubric', [])

//Required to remove the conviction between Handlebars and Angular.
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})

.controller('mainController', function($http,$scope) {

    var socket = io.connect('');

    socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
    });
    $scope.rubric = function(rubricName){

        $http.get('/degProcess'+rubricName, {msg: rubricName}).
            then(function(response) {
                //Response is the data returned at call.
                console.log(response);
            }, function(response) {
                //This is the Error if it breaks
                console.log(response);
            });

    };


});