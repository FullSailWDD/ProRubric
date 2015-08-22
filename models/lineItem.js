module.exports = function() {
    var db          = require('../config/db'),
        mongoose    = require('mongoose'),
        data        = require('../lib/sanitize.js');
    
    
    var lineItemSchema = mongoose.Schema({
        title : String,
        content : String,
        section_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    }),
    
    
    _model = mongoose.model('lineItems', lineItemSchema);

    
// CRUD Methods 
// ==========================================================================
    // ADD
    var _save = function(lineItem, success, fail){

        var newLineItem = new _model({
            title:      lineItem.title,
            content:    lineItem.content,
            section_id: lineItem.section_id
        });


        newLineItem.save(function(err){
                if (err) {
                    fail(err);
                }else{
                    success(newLineItem);
                }
            });
        },
    
    // UPDATE 
    _update = function(lineItem, success, fail){

       var cleanData = data.sanitize(lineItem);

            if(cleanData){

                _model.update({'_id':lineItem._id}, {$set:cleanData}, function(err,doc){
                    if (err) {
                        fail(err);
                    }else{
                        success(doc);
                    }

                });

            }
    },
    
    // REMOVE
    _remove = function(lineItem,success,fail){

        _model.findByIdAndRemove({'_id':lineItem._id}, function(err,doc){

            if (err) {
                fail(err);
            }else{
                success(doc);
            }
        });
    };
    
    
// Publicly Available
// ==========================================================================

    return {
        schema :        lineItemSchema,
        model :         _model,
        add :           _save,
        update :        _update,
        remove :        _remove
    };
}();

