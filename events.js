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
        let settingsCollection = db.collection('settings');
        let guildSettings = await settingsCollection.findOne({ guildId: message.channel.guild.id });
        if (guildSettings) {
            if (guildSettings.events.unsafeLinks) {
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

    bot.on('guildCreate', async guild => {
        loggr.debug('Encountered guildCreate.');
        let settingsCollection = db.collection('settings');
        let guildExists = await settingsCollection.findOne({ guildId: guild.id });
        if (!guildExists) {
            await settingsCollection.insertOne({
                guildId: guild.id,
                events: {
                    channelCreate: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} created channel {channel->name}.'
                    },
                    channelDelete: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} deleted channel {channel->name}.' 
                    },
                    channelUpdate: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} updated channel {channel->name}.\n{channel->changes}'
                    },
                    guildBanAdd: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} banned {member->name}.\nReason: {reason}'
                    },
                    guildBanRemove: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} unbanned {member->name}.\nReason: {reason}'
                    },
                    guildEmojisUpdate: {
                        enabled: false,
                        format: '{time} | {icon} The emojis were updated.\n{emojis->changes}'
                    },
                    guildMemberAdd: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} joined.'
                    },
                    guildMemberRemove: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} left.'
                    },
                    guildMemberUpdate: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} has been edited.\n{member->changes}'
                    },
                    guildRoleCreate: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} created role {role->name}.'
                    },
                    guildRoleDelete: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} deleted role {role->name}.'
                    },
                    guildRoleUpdate: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} updated role {role->name}.\n{changes}'
                    },
                    guildUpdate: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} updated the guild.\n{changes}'
                    },
                    messageDelete: {
                        enabled: false,
                        format: '{time} | {icon} A message was deleted.\n**Author:** {message->author}\n**Content:** {message->content}'
                    },
                    messageDeleteBulk: {
                        enabled: false,
                        format: '{time} | {icon} Multiple messages were deleted by {moderator->name}.'
                    },
                    messageReactionAdd: {
                        enabled: false,
                        format: '{time} | {icon} {target->name} added a reaction to a message.\n**Reaction:** {reaction}'
                    },
                    messageReactionRemove: {
                        enabled: false,
                        format: '{time} | {icon} {target->name} removed a reaction from a message.\n**Reaction:** {reaction}'
                    },
                    messageReactionRemoveAll: {
                        enabled: false,
                        format: '{time} | {icon} {moderator->name} removed all reactions from a message.'
                    },
                    messageUpdate: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} edited their message.\n**Old Content:** {message->oldContent}\n**New Content:** {message->newContent}'
                    },
                    voiceChannelJoin: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} joined {channel->name}.'
                    },
                    voiceChannelLeave: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} left {channel->name}.'
                    },
                    voiceChannelSwitch: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} switched from {oldChannel->name} to {channel->name}.'
                    },
                    unsafeLinks: {
                        enabled: false,
                        format: '{time} | {icon} {member->name} posted one or more unsafe links in their message.\n**Links:** {message->unsafeLinks}'
                    }
                }
            });
            loggr.info('Added guild to database: ' + guild.id);
        }
    });

    bot.on('guildDelete', () => {
        loggr.debug('Encountered guildDelete.');
    });

    bot.on('unsafeLinks', dangerousLinks => {
        loggr.debug('Encountered unsafeLinks.');
    });
};