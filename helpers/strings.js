module.exports = {
    getGreeting: firstName => `Bonjour ${firstName}. My name is Pierre.`,
    addToChannel: channel => `I have added you to the ${channel} channel`,
    interests: `Here is how I can help you. What are you interested in?`,
    channelFound: `Excellent! I have found a channel for you.`,
    channelNotFound: `I do not have a channel for this topic`,
    addToChannelQuestion: channel => `Would you like me to add you to the ${channel} channel?`,
    cannotUnderstand: `Sorry, I am having trouble understanding. Could you please say again?`,
};