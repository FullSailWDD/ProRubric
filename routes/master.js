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

    app.get('/degProcess',function(req,res){
        var degreeObj = 'Web Design and Deployment';
        Degree.update(degreeObj);
    });

    app.get('/courseProcess',function(req,res){
        var courseObj = 'Deployment of Web Projects';
    });

    app.get('/degUpdate',function(req,res){
        Degree.update(req.degreeId);
    });

    app.get('/degRemove',function(req,res){
        Degree.remove(req.degreeId);
    });

};