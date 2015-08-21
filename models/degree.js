module.exports = function (){

    var db          = require('../config/db'),
        mongoose    = require('mongoose');
        data        = require('../lib/sanitize.js');
    
    
    var degreeSchema = mongoose.Schema({

        title : String,
        acronym : String,
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    });

    var _model = mongoose.model('degrees', degreeSchema);
    

// CRUD Methods 
// ==========================================================================
    
    // ADD 
    var _save = function(degree, success, fail){

        var newDegree = new _model({
            
            title:        degree.title,
            acronym:      degree.acronym
        });

        newDegree.save(function(err){
            
            if (err) {
                fail (err);
            } else {
                success(newDegree);
            }
        });
    };
    
    // UPDATE 
    var _update = function(degree,success,fail){


        var cleanData = data.sanitize(degree);
        
        if(cleanData){

            _model.update({'_id':degree._id}, {$set:cleanData}, function(err,doc){

//            if(err) console.log(err);
//            console.log(result);

                if (err) {
                    fail(err);
                }else{
                    success(doc);
                }
            });
        }


    };
    
    
    // REMOVE
    var _remove = function(degree,success,fail){

        _model.findByIdAndRemove({'_id':degree._id}, function(err,doc){

            if (err) {
                fail(err);
            }else{
                success(doc);
            }
            
//            if(err) return console.log(err);
//            console.log(result);
        });
    };
    
    
// Publicly Available
// ==========================================================================
    return {
        schema :        degreeSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove
    };
}();
