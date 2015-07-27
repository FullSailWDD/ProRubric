// npm modules
var express 				= require('express'),
		app 						= express(),
  	exphbs 					= require('express-handlebars'),
		env 						= require('node-env-file');


// View Config
// =============================================================================
// Environmental Vars
env(__dirname+ '/.env');

var db     					= require('./config/db'),
		port 						= process.env.PORT || 3000;


// View Engine
// =============================================================================
app.engine('handlebars', exphbs({ defaultLayout: 'default'}));
app.set('view engine', 'handlebars');


// ROUTES
// =============================================================================
var master_routes = require('./routes/master')(app);

// static file handling
app.use(express.static(__dirname+'/public'));


// START THE SERVER
// =============================================================================
var server = app.listen(port);
console.log('Starting Node Server on Port ' + port);