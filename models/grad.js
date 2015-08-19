module.exports = function (){
    var db          = require('../config/db'),
        mongoose    = require('mongoose');
        
    var gradSchema  = mongoose.Schema({
        name: String,
        bio: String,
        profile_picture: String,
        project: Object,
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    });

    var _model = mongoose.model('grad', gradSchema);


    // CRUD Methods 
    // ============================================================================================================
    // Success and Failure are passed in as callbacks
    
    // Add new Grad to DB
    var _save = function (grad, success, fail){
        var newGrad    = new _model({
            name:               grad.name,
            bio:                grad.bio,
            profile_picture:    grad.profile_picture,
            project:            grad.project
        });

        newGrad.save(function(err) {
            if (err){
                fail(err);
            } else {
                success(newGrad);
            }
        });
    }


    var _findByID = function (_id, success, fail){
        _model.findOne({'_id':_id}, function (err, doc){
            if (err){
                fail(err);
            } else {
                success(doc);
            }
        });
    }

    // Return All
    var _all = function (success, fail){
        _model.find({}, function (err, doc){
            if (err){
                fail(err);
            } else {
                success(doc);
            }
        });
    }

    // Remove 1 by ID
    var _removeByID = function (_id, success, fail){
         _model.findOneAndRemove({'_id':_id}, function (err, doc){
            if (err) {
                fail(err);
            } else if(!err && doc === null) {
                // No technical error, just logistical
                fail({error: "No Matching ID to Remove"});
            } else if(!err && doc != null) {
                //success
                success(doc);
            }
        });
    }

    // Publicly Available
    return {
        schema :        gradSchema,
        model :         _model,
        findByID :      _findByID,
        findAll :       _all,
        removeByID :    _removeByID,
        add:            _save
    }





}();