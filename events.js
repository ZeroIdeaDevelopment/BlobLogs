module.exports = (bot, loggr, metrics) => {
    bot.on('channelCreate', chan => {
        metrics.increment('events.channelCreate');
    });

    bot.on('channelDelete', chan => {
        metrics.increment('events.channelDelete');
    });

    bot.on('channelUpdate', chan => {
        metrics.increment('events.channelUpdate');
    });

    bot.on('guildBanAdd', (guild, user) => {
        metrics.increment('events.guildBanAdd');
    });

    bot.on('guildBanRemove', (guild, user) => {
        metrics.increment('events.guildBanAdd');
    });

    bot.on('guildEmojisUpdate', (guild, emojis, oldEmojis) => {
        metrics.increment('events.guildEmojisUpdate');
    });

    bot.on('guildMemberAdd', (guild, member) => {
        metrics.increment('events.guildMemberAdd');
    });

    bot.on('guildMemberRemove', (guild, member) => {
        metrics.increment('events.guildMemberRemove');
    });

    bot.on('guildMemberUpdate', (guild, member, oldMember) => {
        metrics.increment('events.guildMemberUpdate');
    });

    bot.on('guildRoleCreate', (guild, role) => {
        metrics.increment('events.guildRoleCreate');
    });

    bot.on('guildRoleDelete', (guild, role) => {
        metrics.increment('events.guildRoleDelete');
    });

    bot.on('guildRoleUpdate', (guild, role, oldRole) => {
        metrics.increment('events.guildRoleUpdate');
    });

    bot.on('guildUpdate', (guild, oldGuild) => {
        metrics.increment('events.guildUpdate');
    });

    bot.on('messageCreate', message => {
        metrics.increment('events.messageCreate');
    });

    bot.on('messageDelete', message => {
        metrics.increment('events.messageDelete');
    });

    bot.on('messageDeleteBulk', messages => {
        metrics.increment('events.messageDeleteBulk');
    });

    bot.on('messageReactionAdd', (message, emoji, userID) => {
        metrics.increment('events.messageReactionAdd');
    });

    bot.on('messageReactionRemove', (message, emoji, userID) => {
        metrics.increment('events.messageReactionRemove');
    });

    bot.on('messageReactionRemoveAll', message => {
        metrics.increment('events.messageReactionRemoveAll');
    });

    bot.on('voiceChannelJoin', (member, newChannel) => {
        metrics.increment('events.voiceChannelJoin');
    });

    bot.on('voiceChannelLeave', (member, oldChannel) => {
        metrics.increment('events.voiceChannelLeave');
    });

    bot.on('voiceChannelSwitch', (member, newChannel, oldChannel) => {
        metrics.increment('events.voiceChannelSwitch');
    });

    bot.on('guildCreate', () => {
        metrics.increment('stats.guild_count');
        metrics.set('stats.user_count', bot.users.size);
    });

    bot.on('guildDelete', () => {
        metrics.decrement('stats.guild_count');
        metrics.gauge('stats.user_count', bot.users.size);
    });

    bot.on('ready', () => {
        loggr.info(`events.js - Ready, ${bot.guilds.size} guilds and ${bot.users.size} users pushed to metrics.`);
        metrics.gauge('stats.guild_count', bot.guilds.size);
        metrics.gauge('stats.user_count', bot.users.size);
    });
};