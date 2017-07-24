module.exports = {
    getGreeting: firstName => `Hi ${firstName}. Welcome to the IdeaPeer bot.`,
    addToChannel: channel => `Adding you to the channel: ${channel}`,
    interests: `What are your interests?`,
    channelFound: `Sweet! Found a channel for you.`,
    channelNotFound: `Couldn't find an existing channel.`,
    // add other greeting and strings here with name annd topic params
    // TODO add synonym finder here
};