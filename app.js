// npm modules
var express 				= require('express'),
		app 				= express(),
  	exphbs 					= require('express-handlebars'),
	io 						= require('socket.io'),
  	outputs  				= require('./lib/outputs.js')();

// View Config
// =============================================================================
var		port 					= process.env.PORT || 3000;



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

var server = app.listen(port);
var socket = io.listen(server);

socket.on('connection', function (data) {
	data.on('my other event', function (callback) {
		console.log(callback);
		data.emit('rubric', {data: callback});
	});
});

outputs.debug(port, "Node Server Port Status", true);
