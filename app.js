// npm modules
<<<<<<< HEAD
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var mods   = require('./config/db.js');
var bodyParser = require('body-parser');

//		env 						= require('node-env-file');

=======
var express 				= require('express'),
    app 				    = express(),
  	exphbs 					= require('express-handlebars');
>>>>>>> 745b859cda830c51460ee2afd0e26ef57339e20f


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
console.log('Starting Node Server on Port ' + port);