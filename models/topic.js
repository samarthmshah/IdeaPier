var mongoose = require("mongoose");

var TopicSchema = new mongoose.Schema({
  topic: String,
  synonyms: Array,
  activeChannels: Array,
  archivedChannels: Array,
  users: Array,
  meetings: Array
});

module.exports = mongoose.model('Topic', TopicSchema);
