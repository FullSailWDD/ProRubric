module.exports = function() {
    var db          = require('../config/db'),
        mongoose    = require('mongoose');
    
    
    var lineItemSchema = mongoose.Schema({
        
        title : String,
        content : String,
        section_id : {type : Number, default : 0},
        created_at : {type : Date, default: Date.now},
        updated_at : {type : Date, default: Date.now}
    });
    
    
    var _model = mongoose.model('lineItems', lineItemSchema);
    
    
    
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
    };
    
    // UPDATE 
    var _update = function(lineItem){

        _model.update({'_id':lineItem._id}, {$set:{'title':lineItem.title}}, function(err, result){
            
            if(err) console.log(err);
            console.log(result);
        });
    };
    
    
    // REMOVE
    var _remove = function(lineItem){

        _model.findByIdAndRemove({'_id':lineItem._id}, function(err, result){
            
            if(err) return console.log(err);
            console.log(result);
        });
    };
    
    
// Publicly Available
// ==========================================================================
    
    return {
        schema :        lineItemSchema,
        model :         _model,
        add:            _save
    };
}();






