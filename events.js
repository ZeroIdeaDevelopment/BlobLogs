const spoopy = require('spoopylink');
const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/ig;

module.exports = (bot, loggr, db) => {
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

    bot.on('messageCreate', async message => {
        loggr.debug('Encountered messageCreate.');
        if (await db[`settings:${message.channel.guild.id}`].events.unsafeLinks) {
            let links = message.content.match(urlRegex);
            if (links !== null) {
                let linkCheckResults = await spoopy(links);
                let dangerousLinks = [];
                if (linkCheckResults.length !== undefined) {
                    linkCheckResults.forEach(link => {
                        if (!link.safe) {
                            dangerousLinks.push({
                                url: link.url,
                                reasons: link.reasons
                            });
                        }
                    });
                } else {
                    if (!linkCheckResults.safe) {
                        dangerousLinks.push({
                            url: linkCheckResults.url,
                            reasons: linkCheckResults.reasons
                        });
                    }
                }
                if (dangerousLinks.length > 0) bot.emit('unsafeLinks', dangerousLinks);
            }
        }
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

    bot.on('messageUpdate', (message, oldMessage) => {
        loggr.debug('Encountered messageUpdate.');
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

    bot.on('unsafeLinks', dangerousLinks => {

    });
};