var mongoose = require("mongoose");

var TopicSchema = new mongoose.Schema({
  topic           : { type: String, index: true },
  synonyms        : { type: String, index: true },
  activeChannels  : [String],
  archivedChannels: [String],
  users           : [String],
  meetings        : Array
});

module.exports = mongoose.model('Topic', TopicSchema);
