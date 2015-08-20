module.exports = function(app) {

    var allModel = require('../models/crud.js');//requiring the schemas to be ready to go into mongo


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

        allModel.insertDegrees(degName,degAck);

    });

    app.get('/courseProcess',function(req,res){

        var courName = 'Deployment of Web Projects',
            courAck = 'DWP',
            courContent = 'This is a rubric for out class that we are currently in';

        allModel.insertCourse(courName,courAck,courContent);

    });
    
    
    
    app.get('/degUpdate',function(req,res){


        allModel.updateDegree(req.degreeId);

    });
    
    
    app.get('/degRemove',function(req,res){


        allModel.removeDegree(req.degreeId);

    });

};