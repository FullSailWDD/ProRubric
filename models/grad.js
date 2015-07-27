var mongoose     = require('mongoose');

var GradSchema   = mongoose.Schema({
    name: String,
    bio: String,
    profile_picture: String,
    project: Object,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// ========= Methods ============
var GradModel = mongoose.model('grad', GradSchema);

exports.saveGrad   = function(name,bio,profile_picture,project){

	// // creates a new message with the shema in Msg models
	var addGrad    = new GradModel({
    	name: name,
        bio: bio,
        profile_picture: profile_picture,
        project: project
	});
	
	// Saves Grad information
    addGrad.save(function(err) {
    	
    	if(err){	
            console.log('addGrad[ERROR]: ' + name + err );
    	} else {
            console.log('addGrad[Success]: ' + name );
        }
    });

};
