// ==============Dependencies=============================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Note = require("./models/Notes.js");
var Tracks = require("./models/Tracks.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// ========SERVER AND DB SETUP============================

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/pitchfork", { useMongoClient: true });
var db = mongoose.connection;

// Show any mongoose errors
db.on('error', console.error.bind(console, 'connection error:'));

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// ============ROUTES===============================================
app.get("/", function(req, res) {
    res.send("./public/index.html");
});

app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("http://www.pitchfork.com/reviews/best/tracks/", function(error, response, html) {

        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);

        // Save an empty result object
        var result = {};
        $('ul.artist-list').each(function(i, element) {

            result.artist = $(element).children().text();
            result.title = $(element).siblings().text();
            //get help traversing dom for this part
            // result.image = $(element).parents(".track-collection-item").children().attr("src");

            console.log(result);

            var entry = new Tracks(result);

            // save that entry to the db
            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });
        });
    });
    // Tell the browser that we finished scraping the text
    res.send("Scrape Complete");
});

// ============= Listen on port 3000===========================
app.listen(3000, function() {
    console.log("App running on port 3000!");
});
