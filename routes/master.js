module.exports = function(app) {

    // route /
    app.get('/', function(req, res) {
        res.render('index', {
        		seoPageTitle: 'ProRubrics - A Full Sail University Production',
            h1: 'Dashboard'
        });
    });

    app.get('/rubric', function(req, res) {
        var data = 'Yeah you got the data';
        res.send(data);
    });

};