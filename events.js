module.exports = (bot, loggr) => {
    bot.on('channelCreate', chan => {
        loggr.debug('Encountered channelCreate.');
    });

    bot.on('channelDelete', chan => {
        loggr.debug('Encountered channelDelete.');
    });

    bot.on('channelUpdate', chan => {
        loggr.debug('Encountered channelUpdate.');
    });

    bot.on('guildBanAdd', (guild, user) => {
        loggr.debug('Encountered guildBanAdd.');
    });

    bot.on('guildBanRemove', (guild, user) => {
        loggr.debug('Encountered guildBanRemove.');
    });

    bot.on('guildEmojisUpdate', (guild, emojis, oldEmojis) => {
        loggr.debug('Encountered guildEmojisUpdate.');
    });

    bot.on('guildMemberAdd', (guild, member) => {
        loggr.debug('Encountered guildMemberAdd.');
    });

    bot.on('guildMemberRemove', (guild, member) => {
        loggr.debug('Encountered guildMemberRemove.');
    });

    bot.on('guildMemberUpdate', (guild, member, oldMember) => {
        loggr.debug('Encountered guildMemberUpdate.');
    });

    bot.on('guildRoleCreate', (guild, role) => {
        loggr.debug('Encountered guildRoleCreate.');
    });

    bot.on('guildRoleDelete', (guild, role) => {
        loggr.debug('Encountered guildRoleDelete.');
    });

    bot.on('guildRoleUpdate', (guild, role, oldRole) => {
        loggr.debug('Encountered guildRoleUpdate.');
    });

    bot.on('guildUpdate', (guild, oldGuild) => {
        loggr.debug('Encountered guildUpdate.');
    });

    bot.on('messageCreate', message => {
        loggr.debug('Encountered messageCreate.');
    });

    bot.on('messageDelete', message => {
        loggr.debug('Encountered messageDelete.');
    });

    bot.on('messageDeleteBulk', messages => {
        loggr.debug('Encountered messageDeleteBulk.');
    });

    bot.on('messageReactionAdd', (message, emoji, userID) => {
        loggr.debug('Encountered messageReactionAdd.');
    });

    bot.on('messageReactionRemove', (message, emoji, userID) => {
        loggr.debug('Encountered messageReactionRemove.');
    });

    bot.on('messageReactionRemoveAll', message => {
        loggr.debug('Encountered messageReactionRemoveAll.');
    });

    bot.on('voiceChannelJoin', (member, newChannel) => {
        loggr.debug('Encountered voiceChannelJoin.');
    });

    bot.on('voiceChannelLeave', (member, oldChannel) => {
        loggr.debug('Encountered voiceChannelLeave.');
    });

    bot.on('voiceChannelSwitch', (member, newChannel, oldChannel) => {
        loggr.debug('Encountered voiceChannelSwitch.');
    });

    bot.on('guildCreate', () => {
        loggr.debug('Encountered guildCreate.');
    });

    bot.on('guildDelete', () => {
        loggr.debug('Encountered guildDelete.');
    });
};