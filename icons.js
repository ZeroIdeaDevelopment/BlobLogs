module.exports = bot => {
    let icons = {
        channelCreate: '<:channelcreate:432986578781077514>',
        channelDelete: '<:channeldelete:432986579674333215>',
        memberJoin: '<a:ablobjoin:483676111776120852>',
        memberLeave: '<a:ablobleave:483676112329637891>'
    }

    return (guild, icon) => {
        let botId = bot.user.id;
        let member = guild.members.find(member => member.id === botId);

        if (icons[icon]) {
            if (member.permission.has('externalEmojis')) {
                return icons[icon][0];
            } else {
                return '[External emojis disabled]'
            }
        } else {
            return '[Internal error]';
        }
    };
}