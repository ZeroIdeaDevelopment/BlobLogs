const Eris = require('eris');
const CatLoggr = require('cat-loggr');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const Redite = require('redite');

const loggr = new CatLoggr();
const db = new Redite({
    url: config.redisURL
});

loggr.info('Getting the blobs...');
const blobs = fs.readdirSync('blobs');
loggr.info('Blobs got!');

const bot = new Eris.CommandClient(config.token, { maxShards: 'auto' }, { description: 'Your not-so-mundane logger bot!\nWebsite: https://bloblogs.club/', owner: 'ZeroIdea Development', prefix: ['blob ', 'b!', '@mention '] });

bot.on('ready', async () => {
    loggr.info('Bot is ready!');
    let blob64 = Buffer.from(fs.readFileSync(path.join('blobs', 'b1nzyblob2.png'))).toString('base64');
    try {
        await bot.editSelf({
            avatar: 'data:image/png;base64,' + blob64
        });
        loggr.info('Avatar reset.');
    } catch (e) {
        loggr.error('Failed resetting avatar.', e);
    }
    await bot.editStatus({
        type: 3,
        name: 'logs | blob help | https://bloblogs.club | b1nzyblob2'
    });
    loggr.info('Status updated.');
});

require('./commands')(bot, loggr, db);
loggr.info('Commands loaded.');

require('./events')(bot, loggr, db);
loggr.info('Events loaded.');

loggr.init('Here we go!');
bot.connect();

setInterval(async () => {
    try { 
        let blob = blobs[Math.floor(Math.random() * blobs.length)];
        let blob64 = Buffer.from(fs.readFileSync(path.join('blobs', blob))).toString('base64');
        await bot.editSelf({
            avatar: 'data:image/png;base64,' + blob64
        });
        await bot.editStatus({
            type: 3,
            name: 'logs | blob help | https://bloblogs.club | ' + blob.substring(0, blob.length - 4)
        });
        loggr.info('Avatar changed. New avatar is ' + blob.substring(0, blob.length - 4));
    } catch (e) {
        loggr.error('Error while editing avatar! :(', e);
    }
}, 30 * 1000 * 60);