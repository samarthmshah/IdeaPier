// all functionalities of a Topic
const tcom = require('thesaurus-com');

function topicController() {
    const Topic = require('../models/topic');

    // Creating New User
    this.createTopic = function (req, res, next) {
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

    // Get all User info
    this.getTopic = function (req, res, next) {
        const topic = req.body.topic;

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

    this.getTopicsBySyn = function (req, res, next) {
        const topic = req.body.topic;

        return Topic.find({
            syns: topic
        }, function (err, result) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'topic Details': result});
            }
        });
    };

    return this;

};

module.exports = new topicController();