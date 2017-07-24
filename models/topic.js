var mongoose = require("mongoose");

var TopicSchema = new mongoose.Schema({
    channel: String,
    history: {

    },
    users: {
      username: String
    },
    meetings: {
      meetingId: Number
    }
});

module.exports = mongoose.model('Topic', TopicSchema);
