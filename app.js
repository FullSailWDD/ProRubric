// npm modules
var express 				= require('express'),
		app 						= express(),
		port 						= process.env.PORT || 3000,
  	exphbs 					= require('express-handlebars');


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