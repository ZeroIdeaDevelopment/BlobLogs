module.exports = (bot, loggr, metrics) => {
    bot.on('messageCreate', msg => {
        loggr.info('EVENT - messageCreate');
        metrics.increment('events.messageCreate');
    });
};