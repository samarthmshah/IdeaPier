// all functionalities of a Topic
const tcom = require('thesaurus-com');

function topicController() {
    const Topic = require('../models/topic');

    // Creating New Topic
    this.createTopic = function(body){
        this.createTopicHttp({body:body});
    }
    // Creating New Topic for HTTP
    this.createTopicHttp = function (req, res, next) {
        const topic = req.body.topic;
        const user = req.body.user;
        const synonyms = tcom
            .search(topic)
            .synonyms;

        return Topic.create({
            topic: topic,
            synonyms: synonyms,
            users: [user]
        }, function (err, result) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'result': result, 'status': 'successfully saved'});
            }
        });
    };

    // Get all Topic info
    this.getTopic = function(params) {
        getTopicHttp({params:params})
    };
    // get all topic info for HTTP
    this.getTopicHttp = function (req, res, next) {
        const topic = req.params.topic;

        Topic.find({
            topic: topic
        }, function (err, result) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'topic Details': result});
            }
        });
    };

    // get topic by synonym
    this.getTopicsBySyn = function(params) {
        getTopicsBySynHttp({params:params})
    };

    // get topic by synonym for HTTP
    this.getTopicsBySynHttp = function (req, res, next) {
        const topic = req.params.topic;
        console.log("arositenarotn", req.params)
        return Topic.find({
            $or: [
                {
                    synonyms: topic
                }, {
                    topic: topic
                }
            ]
        }, function (err, result) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'topic Details': result});
            }
        });
    };

    this.addChannelIdForTopic = function (req, res, next) {
        const channelId = req.body.channelId;
        const topic = req.body.topic;

        Topic.update({
            topic: topic
        },
        { 
            $addToSet: { activeChannels: channelId }
        },
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                console.log(result);
                return res.send({'topic Details': result});
            }
        });
    }

    return this;

};

module.exports = new topicController();