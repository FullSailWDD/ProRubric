// npm modules
var express 				= require('express'),
	app 					= express(),
  	exphbs 					= require('express-handlebars'),
  	outputs  				= require('./lib/outputs.js')();


// View Config
// =============================================================================
var		port 					= process.env.PORT || 3000;


// Databse Models
// =============================================================================
// var Grad            = require('./models/grad.js');


// View Engine
// =============================================================================
app.engine('handlebars', exphbs({ defaultLayout: 'default'}));
app.set('view engine', 'handlebars');


// ROUTES
// =============================================================================
var master_routes 	= require('./routes/master')(app);


// static file handling
app.use(express.static(__dirname +'/public'));


// START THE SERVER
// =============================================================================
var server 					= app.listen(port);
outputs.debug(port, "Node Server Port Status", true);
