// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var TracksSchema = new Schema({
  // title is a required string
  artist: {
    type: String,
   
  },
  // link is a required string
  title: {
    type: String,

  },

  image: {
    type: String,
   
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create the Article model with the ArticleSchema
var Tracks = mongoose.model("Tracks", TracksSchema);

// Export the model
module.exports = Tracks;