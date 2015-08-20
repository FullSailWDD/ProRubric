module.exports = function(app) {

    var degModel = require('../models/degree.js');


    // route /
    app.get('/', function(req, res) {
        res.render('index', {
        		seoPageTitle: 'ProRubrics - A Full Sail University Production',
            h1: 'Dashboard'
        });
    });

    app.get('/degProcess',function(req,res){//need to wait until form is completed to change route into post

        var degName = 'Web Design and Deployment';//hard coded values for testing purposes
        var degAck = 'WDD';//hard coded values for testing purposes

        degModel.insertDegrees(degName,degAck);

    });

    app.get('/courseProcess',function(req,res){

        var courName = 'Deployment of Web Projects',
            courAck = 'DWP',
            courContent = 'This is a rubric for out class that we are currently in';

        allModel.insertCourse(courName,courAck,courContent);

    });


    app.get('/degreeRemove',function(req,res){

        var degTitle = 'Web Design and Deployment';

        allModel.removeByTitle(degTitle);

    });

};