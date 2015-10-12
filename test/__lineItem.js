var expect          = require("chai").expect,
    assert          = require('assert'),
    degree          = require('../models/degree.js');

describe('Degree Info', function() {
    
    var testDegree = null;
    
    beforeEach(function(done){
        
        degree.add({
                title: "Web Deployment",
                acronym: "WD"
            }, function (doc) {
                testDegree = doc;
                doc.title.should.equal('Web Deployment');
                done();
            });
        
    });
    
     afterEach( function (done) {
        degree.remove(testDegree._id, function () {        
            done();
        });
    });
});