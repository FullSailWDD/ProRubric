var mongoose = require("mongoose");

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/projdelta';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('Connection[ERROR]: ' + uristring + '. ' + err);
    } else {
        // console.log('Connection[Success]: ' + uristring);
    }
});
