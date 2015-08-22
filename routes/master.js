module.exports = function(app) {

    var Degree = require('../models/degree.js'),
        Course = require('../models/course.js'),
        Rubric = require('../models/rubric.js'),
        Section = require('../models/section.js'),
        LineItem = require('../models/lineItem.js');

    // route /
    app.get('/', function(req, res) {
        res.render('index', {
        		seoPageTitle: 'ProRubrics - A Full Sail University Production',
            h1: 'Dashboard'
        });
    });

    app.get('/degProcess:degData',function(req,res) {
        var degName = req.params.degData;
        Degree.add(degName);
        res.send(degName);

    });

//========================================All Create New Processes==========================================================

    app.get('/degProcess',function(req,res){//need to wait until form is completed to change route into post

        var degreeObj = 'Web Design and Deployment';//hard coded values for testing purposes
        Degree.update(degreeObj);
    });

    app.get('/courseProcess',function(req,res){
        var courseObj = 'Deployment of Web Projects';
    });



//========================================All Update Processes==========================================================


    app.get('/degUpdate',function(req,res){
        Degree.update(req.degreeId);
    });

//========================================All Remove Processes==========================================================

    

    app.get('/degRemove',function(req,res){
        Degree.remove(req.degreeId);
    });

};