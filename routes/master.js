module.exports = function (app, socket) {

    var Degree = require('../models/degree.js'),
        Course = require('../models/course.js'),
        Rubric = require('../models/rubric.js'),
        Section = require('../models/section.js'),
        LineItem = require('../models/lineItem.js');

        socket.on('connection', function (data) {
            
        //Degree Sockets    
            data.once('degree req', function (data) {
                console.log(data);
                Degree.one(data, function (doc) {
                    socket.emit('degree send', doc);
                }, function (err) {
                    console.log(err, 'Return all Courses', false);
                });
            });
            
            data.once('update degree', function (data) {
                Degree.update(data, function (err) {
                    console.log(data);
                    console.log(err, 'Return all update');
                });
            });
            
            Degree.all(function (doc) {
                socket.emit('find degrees', doc);
            }, function (err) {
                outputs.debug(err, 'Return all Degrees', false);
            });
            
            data.on('delete degree', function (callback) {
                Degree.remove(callback);
            });

            data.on('add degree', function (callback) {
                Degree.add(callback);
            });
        //End Degree Sockets



        //Start Courses Sockets
        data.on('add course',function(callback){
            Course.add(callback);
        });
        data.on('delete course', function(data){
            Course.remove(data);
        });
        
        Course.find(function(doc){
            data.emit('find course', doc)
        }, function(err){
            console.log(err);
        });

        data.once('course req', function (data) {
                console.log(data);
                Course.one(data, function (doc) {
                    socket.emit('course send', doc);
                }, function (err) {
                    console.log(err, 'Return all Courses', false);
                });
        });
        
        data.once('update course', function (data) {
                Course.update(data, function (err) {
                    console.log(data);
                    console.log(err, 'Return all course update');
                });
            });
        
        
        //End Courses Sockets
        
        //Start Rubric Sockets

            data.on('add rubric', function (callback) {
                console.log(callback);
                Rubric.add(callback);
            });
            
            
            
            
            
            
            
            
            
            
        //End Rubric Sockets
        
        //Start Section Sockets
        
        
        
        
        //End Section Sockets
        
        //Start Line Item Sockets

            data.on('add lineItem', function (callback) {
                LineItem.add(callback);
            });
            
            
        
            
            
            
        }); //End Sockets

    
    
    
    app.get('/', function (req, res) {
        res.render('index');
    });
}