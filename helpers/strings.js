module.exports = {
    getGreeting: firstName => `Hi ${firstName}. Welcome to the IdeaPeer bot.`,
    addToChannel: channel => `Adding you to the channel: ${channel}`,
    interests: `What are your interests?`,
    channelFound: `Sweet! Found a channel for you.`,
    channelNotFound: `Couldn't find an existing channel.`,
    addToChannelQuestion: channel => `Would you like for me to add you to channel ${channel}?`,
    cannotUnderstand: `Sorry, I'm having tough time understanding. Could you repeat your interest?`,
    // add other greeting and strings here with name annd topic params
    // TODO add synonym finder here
};