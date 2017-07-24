var mongoose = require("mongoose");

var TopicSchema = new mongoose.Schema({
    channel: String,
    history: {

    },
    users: {
      username: Array
    },
    meetings: {
      meetingIds: Array
    }
});

module.exports = mongoose.model('Topic', TopicSchema);
