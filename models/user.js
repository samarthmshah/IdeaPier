var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  meetingIDs: { 
    meetID: Number
  },
  username: String,
  topics: {
    topicId: Number
  }
});

module.exports = mongoose.model('User', UserSchema);
