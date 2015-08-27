module.exports = function (app, socket) {

    var Degree = require('../models/degree.js'),
        Course = require('../models/course.js'),
        Rubric = require('../models/rubric.js'),
        Section = require('../models/section.js'),
        LineItem = require('../models/lineItem.js');


    // route /
    app.get('/', function (req, res) {

        socket.on('connection', function (data) {
            Degree.all(function (doc) {
                socket.emit('find degrees', doc);
            }, function (err) {
                outputs.debug(err, 'Return all Degrees', false);
            });

            data.on('add degree', function (callback) {
                Degree.add(callback);
            });

            data.on('add rubric', function (callback) {
                Rubric.add(callback);
            });

            data.on('add lineItem', function (callback) {
                LineItem.add(callback);
            });
        });

        res.render('index');
    });
};