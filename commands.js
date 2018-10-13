const fs = require('fs');
const path = require('path');

module.exports = (bot, loggr, db) => {
    let getIcon = require('./icons')(bot);

    bot.registerCommand('ping', async (msg, args) => {
        let start = msg.timestamp;
        let m = await msg.channel.createMessage('Blobs are awesome!');
        let end = m.timestamp;
        await m.edit('Pong! Round-robin took ' + (end - start) + 'ms!');
    }, {
        aliases: ['pong'],
        description: 'Ping! Are we online?',
        fullDescription: 'A basic command just to check if the bot is online, and the latency between the bot and Discord, determined by getting the timestamp the command message was sent, creating a message, getting the timestamp of when the new one was sent, and then taking the old one from the new one (end - start).'
    });
    
    bot.registerCommand('blob', 'Are you sure? This can take a long time if it was ratelimited previously.', {
        description: 'Sets the avatar.',
        fullDescription: 'Sets the blob avatar from the blobs folder. Owner-only.',
        reactionButtons: [
            {
                type: 'cancel',
                emoji: '✅',
                async response(msg, args, userID) {
                    loggr.info('Updating blob icon forcefully...');
                    await msg.edit('Updating...');
                    try {
                        let blob64 = Buffer.from(fs.readFileSync(path.join('blobs', args[0] + '.png'))).toString('base64');
                        await bot.editSelf({
                            avatar: 'data:image/png;base64,' + blob64
                        });
                        await bot.editStatus({
                            type: 3,
                            name: 'logs | blob help | ' + args[0]
                        });
                        loggr.info('Updated.');
                        await msg.edit('Okay, I did that.');
                    } catch (e) {
                        loggr.error('Error while updating avatar via blob blob.', e);
                        await msg.edit('Oh no! ' + e.message);
                    }
                }
            },
            {
                type: 'cancel',
                emoji: '❎',
                response: 'Cancelled.'
            }
        ],
        reactionButtonTimeout: 15000,
        requirements: {
            userIDs: [
                '96269247411400704',
                '190544080164487168'
            ]
        },
        permissionMessage: 'Update it here: <https://bloblogs.club/updateBlob.php>',
        hidden: true,
        argsRequired: true,
        usage: '<blob name>'
    });

    bot.registerCommand('reset', 'Are you sure you want to reset all your settings? This cannot be undone!', {
        description: 'Resets your settings.',
        fullDescription: 'Resets your settings by setting the data back to the defaults.',
        reactionButtons: [
            {
                type: 'cancel',
                emoji: '✅',
                async response(msg, args, userID) {
                    loggr.info('Resetting settings for ' + msg.channel.guild.id + '...');
                    await msg.edit('Resetting...');
                    await db[`settings:${msg.channel.guild.id}`].events.set({
                        channelCreate: false,
                        channelDelete: false,
                        channelUpdate: false,
                        guildBanAdd: false,
                        guildBanRemove: false,
                        guildEmojisUpdate: false,
                        guildMemberAdd: false,
                        guildMemberRemove: false,
                        guildMemberUpdate: false,
                        guildRoleCreate: false,
                        guildRoleDelete: false,
                        guildRoleUpdate: false,
                        guildUpdate: false,
                        messageDelete: false,
                        messageDeleteBulk: false,
                        messageReactionAdd: false,
                        messageReactionRemove: false,
                        messageReactionRemoveAll: false,
                        messageUpdate: false,
                        voiceChannelJoin: false,
                        voiceChannelLeave: false,
                        voiceChannelSwitch: false,
                        unsafeLinks: false
                    });
                    await db[`settings:${msg.channel.guild.id}`].loggingFormats.set({
                        channelCreate: '{time} | {icon} {moderator::name} created channel {channel::name}.',
                        channelDelete: '{time} | {icon} {moderator::name} deleted channel {channel::name}.',
                        channelUpdate: '{time} | {icon} {moderator::name} updated channel {channel::name}.\n{channel::changes}',
                        guildBanAdd: '{time} | {icon} {moderator::name} banned {member::name}.\nReason: {reason}',
                        guildBanRemove: '{time} | {icon} {moderator::name} unbanned {member::name}.\nReason: {reason}',
                        guildEmojisUpdate: '{time} | {icon} The emojis were updated.\n{emojis::changes}',
                        guildMemberAdd: '{time} | {icon} {member::name} joined.',
                        guildMemberRemove: '{time} | {icon} {member::name} left.',
                        guildMemberUpdate: '{time} | {icon} {member::name} has been edited.\n{member::changes}',
                        guildRoleCreate: '{time} | {icon} {moderator::name} created role {role::name}.',
                        guildRoleDelete: '{time} | {icon} {moderator::name} deleted role {role::name}.',
                        guildRoleUpdate: '{time} | {icon} {moderator::name} updated role {role::name}.\n{changes}',
                        guildUpdate: '{time} | {icon} {moderator::name} updated the guild.\n{changes}',
                        messageDelete: '{time} | {icon} A message was deleted.\n**Author:** {message::author}\n**Content:** {message::content}',
                        messageDeleteBulk: '{time} | {icon} Multiple messages were deleted by {moderator::name}.',
                        messageReactionAdd: '{time} | {icon} {target::name} added a reaction to a message.\n**Reaction:** {reaction}',
                        messageReactionRemove: '{time} | {icon} {target::name} removed a reaction from a message.\n**Reaction:** {reaction}',
                        messageReactionRemoveAll: '{time} | {icon} {moderator::name} removed all reactions from a message.',
                        messageUpdate: '{time} | {icon} {member::name} edited their message.\n**Old Content:** {message::oldContent}\n**New Content:** {message::newContent}',
                        voiceChannelJoin: '{time} | {icon} {member::name} joined {channel::name}.',
                        voiceChannelLeave: '{time} | {icon} {member::name} left {channel::name}.',
                        voiceChannelSwitch: '{time} | {icon} {member::name} switched from {oldChannel::name} to {channel::name}.',
                        unsafeLinks: '{time} | {icon} {member::name} posted one or more unsafe links in their message.\n**Links:** {message::unsafeLinks}'
                    });
                    await msg.edit('Complete.');
                }
            },
            {
                type: 'cancel',
                emoji: '❎',
                response: 'Cancelled.'
            }
        ],
        reactionButtonTimeout: 15000,
        requirements: {
            permissions: {
                manageGuild: true
            }
        }
    });

    bot.registerCommand('icon', async (msg, args) => {
        let icon = getIcon(msg.channel.guild, args[0]);
        await msg.channel.createMessage(icon ? icon : 'No icon found.');
    }, {
        description: 'Shows what icon the bot will return for an event.',
        argsRequired: true,
        usage: '<icon>',
        guildOnly: true
    });
}