module.exports = function(app, socket) {

    var Degree = require('../models/degree.js'),
        Course = require('../models/course.js'),
        Rubric = require('../models/rubric.js'),
        Section = require('../models/section.js'),
        LineItem = require('../models/lineItem.js');


    // route /
    app.get('/', function(req, res) {

        socket.on('connection', function (data) {
                Degree.model.find({}, function (err, doc) {
                    if (err) {
                        fail(err);
                    } else {
                        socket.emit('find degrees', doc);
                    }
                });
            data.on('add degree', function (callback) {
                Degree.add(callback);
            });

        });
        res.render('index');

    });

};