var expect          = require("chai").expect,
    should          = require('should'),
    allModels         = require('../models/crud.js');

describe('Degree', function() {
    // // test user created before each test
    // var testGrad = null;
    // // test user created specifically for the add grad test
    // var testGrad2 = null;

    // beforeEach(function (done) {
    //     grad.add({
    //         name:               "test",
    //         bio:                "Test User Bio",
    //         profile_picture:    "https://upload.wikimedia.org/wikipedia/commons/7/74/Moon-watching-night-100916-02.jpg",
    //         project:            "Project Info(s)"
    //     }, function (doc) {
    //         testGrad = doc;
    //         doc.name.should.equal('test');
    //         done();
    //     })
    // });

    // afterEach( function (done) {
    //     grad.removeByID(testGrad._id, function () {        
    //         done();
    //     });
    // });

    // it('Find by ID', function (done) {
    //     grad.findByID(testGrad._id, function (doc) {
    //         doc.name.should.equal(testGrad.name);
    //         done();    
    //     });
    // });

    it('Adds New', function (done) {
        allModels.insertDegrees("Deployment of Web Projects", "DWP", function (doc) {
            doc.title.should.equal('Deployment of Web Projects');
            done();
        });
    });

// // ======================================================================
//     it('Update Existing', function (done) {
//         var oldDegObj = {}; // Some actual Degree object
//         var newDegObj = {title:"asda"}
//         allModels.updateDegree(oldDegObj, newDegObj, function (doc){
//             doc.title.should.equal(newDegObj.title);
//             doc.acronym.should.equal(newDegObj.acronym);
//         });

//         allModels.insertDegrees("Deployment of Web Projects", "DWP", function (doc) {
//             doc.title.should.equal('Deployment of Web Projects');
//             done();
//         });
//     });

// ======================================================================


    // it('Remove By ID', function (done) {
    //     grad.removeByID(testGrad2._id, function () {
    //         grad.findByID(testGrad2._id, function (doc) {
    //             expect(doc).to.be.null;
    //             done();
    //         });
    //     });
    // });
});