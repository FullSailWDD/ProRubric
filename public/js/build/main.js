<<<<<<< HEAD
var socket = io.connect('');


//Global App name is ProRubric
=======
>>>>>>> 825d36645116c4c49e59cb7ddb4601d943034ef2
angular.module('ProRubric', [])
.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
})
.controller('mainController', function($http) {

    var rubricName = function(rubricName){

<<<<<<< HEAD
        socket.on('rubric', function (data) {
            console.log(data);
            socket.emit('my other event', { my: rubricName });
        });
        
=======
        $http.get('/degProcess'+rubricName, {msg: rubricName}).
            then(function(response) {
            }, function(response) {
            });

>>>>>>> 825d36645116c4c49e59cb7ddb4601d943034ef2
    };


});