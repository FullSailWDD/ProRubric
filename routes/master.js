module.exports = function(app) {

    var degModel = require('../models/degree.js'),
        courseModel = require('../models/course.js'),
        rubricModel = require('../models/rubric.js'),
        sectionModel = require('../models/section.js'),
        lineItemModel = require('../models/lineItem.js');

    // route /
    app.get('/', function(req, res) {
        res.render('index', {
        		seoPageTitle: 'ProRubrics - A Full Sail University Production',
            h1: 'Dashboard'
        });
    });

    app.get('/degProcess:degData',function(req,res){

        var degName = req.params.degData;

        degModel.add(degName);
        res.send(degName);

    });

    
    
    app.get('/courseProcess',function(req,res){

        var courName = 'Deployment of Web Projects',
            courAck = 'DWP',
            courContent = 'This is a rubric for out class that we are currently in';

        degModel.insertCourse(courName,courAck,courContent);

    });

    
    app.get('/degUpdate',function(req,res){


        degModel.update(req.degreeId);

    });
    
    
    
    app.get('/degRemove',function(req,res){


        allModel.removeDegree(req.degreeId);

    });
    

};