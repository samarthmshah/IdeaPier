// all functionalities of a Topic

const tcom = require('thesaurus-com');

function topicController() {
    const Topic = require('../models/topic');
    const User =require('../models/user');

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

        Topic.find({topic:topic}, function(err, result){
            if (result.length == 0) {
                Topic.create({
                    topic: topic,
                    synonyms: synonyms,
                    users: [user]
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                        // return res.send({'error': err});
                    } else {
                        console.log('success!');
                        return res.send({'result': result, 'status': 'successfully saved'});
                    }
                });
            } else {
                console.log('topic already exists');
                User.update({username: user}, {
                    $addToSet: {topics: topic}
                    }, (err, result) => {
                    if (err) {
                        console.log(err);
                        // return res.send({'error': err});
                    } else {
                        console.log(result);
                        // return  res.send({'user Details': result});
                    }
                    });

                Topic.update(
                    {topic: topic}, 
                    {$addToSet: {users: user}},
                    (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.send({'error': err});
                    } else {
                        console.log(result);
                        return  res.send({'user Details': result});
                    }
        
                });
            }
        });
        // TO-DO check to see if topic exists - if it does, add the user to the topic and the topic to the user.  IF it does not, create the topic and add the user.

        
        
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

    // adds a topic to a user and reciprocates to add the user to the topic
    this.addTopicToUser = function (username, topic) {
        
        Topic.update({topic: topic}, {
            $addToSet: {users: username}
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }

        });

        User.update({username: username}, {
            $addToSet: {topics: topic}
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    };

    // adds a topic to a user and reciprocates to add the user to the topic
    // HTTP version
    this.addTopicToUserHttp = function (req, res, next) {
        const username = req.body.username;
        const topic = req.body.topic;

        User.update({username: username}, {
            $addToSet: {topics: topic}
        }, (err, result) => {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                console.log(result);
                return  res.send({'user Details': result});
            }
        });

        Topic.update(
            {topic: topic}, 
            {$addToSet: {users: username}},
            (err, result) => {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                console.log(result);
                return  res.send({'user Details': result});
            }

        });
    }

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