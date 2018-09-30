const fs = require('fs');
const path = require('path');

module.exports = (bot, loggr) => {
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
    
    bot.registerCommand('blob', 'Are you sure? This screws up the playing message and can take a long time if it was ratelimited previously.', {
        description: 'Sets the avatar.',
        fullDescription: 'Sets the blob avatar from the blobs folder. Owner-only.',
        reactionButtons: [
            {
                type: 'cancel',
                emoji: '✅',
                async response(msg, args, userID) {
                    loggr.info('Updating blob icon forcefully...');
                    let m = await msg.channel.createMessage('Updating...');
                    try {
                        let blob64 = Buffer.from(fs.readFileSync(path.join('blobs', args[0] + '.png'))).toString('base64');
                        await bot.editSelf({
                            avatar: 'data:image/png;base64,' + blob64
                        });
                        loggr.info('Updated.');
                        await m.edit('Okay, I did that.');
                    } catch (e) {
                        loggr.error('Error while updating avatar via blob blob.', e);
                        await m.edit('Oh no! ' + e.message);
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
        hidden: true,
        argsRequired: true,
        usage: '<blob name>'
    });

    bot.registerCommand('icon', async (msg, args) => {
        let icon = getIcon(msg.channel.guild, args[0]);
        await msg.channel.createMessage(icon ? icon : 'No icon found.');
    }, {
        description: 'Shows what icon the bot will return for an event.',
        argsRequired: true,
        usage: '<icon>'
    });
}