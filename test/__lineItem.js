var expect          = require("chai").expect,
    should          = require('should'),
    lineItem        = require('../models/lineItem.js');


describe('Line Item', function() {
    it('Adds New', function (done) {
        var testItem = {
            title: "Branding",
            content: "Some sort of content for a line item"
        };
        lineItem.add(testItem, function (doc) {
            doc.title.should.equal('Branding');
            done();
        });
    });
});
