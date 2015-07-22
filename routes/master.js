module.exports = function(app) {

    // route /
    app.get('/', function(req, res) {
        res.render('index', {
            name: 'World',
            markup: 'none'
        });
    });

};