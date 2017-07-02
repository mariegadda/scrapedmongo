var express = require("express");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var path = require("path");
// Requiring our Note and Article models
// var db = require("../models");
var Note = require("../models/Notes.js");
var Tracks = require("../models/Tracks.js");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


module.exports = function(app) {

        app.get("/", function(req, res) {
           Tracks.find(function(error, doc){
            if (error){
                console.log(error);
            }else{
                console.log("here's the doc" + doc);
                var hndlObject = doc;
                 res.render("../views/index.handlebars", {hndlObject});
            }
           });
     
        });


    //     app.get("/scrape", function(req, res) {
    //         // First, we grab the body of the html with request
    //         request("http://www.pitchfork.com/reviews/best/tracks/", function(error, response, html) {

    //             // Then, we load that into cheerio and save it to $ for a shorthand selector
    //             var $ = cheerio.load(html);

    //             // Save an empty result object
    //             var result = {};
    //             $('ul.artist-list').each(function(i, element) {

    //                 result.artist = $(element).children().text();
    //                 result.title = $(element).siblings().text();
    //                 //empty area for the notes
    //                 // result.image = $(element).parents(".track-collection-item").children().attr("src");
    //                 result.note = [];

    //                 var entry = new Tracks(result);

    //                 // save that entry to the db
    //                 entry.save(function(err, doc) {
    //                     if (err) {
    //                         console.log(err);
    //                     } else {
    //                         console.log("Got in " + doc);
    //                     }
    //                 });
    //             });
    //         });
    //         Tracks.find({})
    //             .populate("note")
    //             .exec(function(error, doc) {
    //                 // Log any errors
    //                 if (error) {
    //                     console.log(error);
    //                 }
    //                 // Or send the doc to the browser as a json object
    //                 else {
    //                     console.log(doc);
    //                     res.json(doc);
    //                 }
    //             });
    //     });
    };
