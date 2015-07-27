// npm modules
var express 				= require('express'),
		app 						= express(),
  	exphbs 					= require('express-handlebars'),
		env 						= require('node-env-file');


// View Config
// =============================================================================
// Environmental Vars
env(__dirname + '/.env');
var db     					= require('./config/db'),
		port 						= process.env.PORT || 3000;


// Databse Models
// =============================================================================
var Grad            = require('./models/grad.js');


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
console.log('Starting Node Server on Port ' + port);






// =============================================================================
// Testing
// // =============================================================================
// // Add to DB
// Grad.saveGrad("Chapman","some bio","https://lynleahz.files.wordpress.com/2012/07/dem-jackass-2_thumb.jpg",{title:"yep, we have one of those"});
// 
	// var allGrads = Grad.allGrads();
	// var gradByID = Grad.findGrad({_id:'55b686d28a60d2c3966888a7'});
// var removeGrad = Grad.removeGrad({_id:'55b689a1d88efe7c9c0a5ed5'});

