module.exports = bot => {
    let icons = {
        memberJoin: [
            '<a:ablobjoin:483676111776120852>',
            ':point_left::door:'
        ],
        memberLeave: [
            '<a:ablobleave:483676112329637891>',
            ':point_right::door:'
        ]
    }

    return (guild, icon) => {
        let botId = bot.user.id;
        let member = guild.members.find(member => member.id === botId);

        if (icons[icon]) {
            if (member.permission.has('externalEmojis')) {
                return icons[icon][0];
            } else {
                return icons[icon][1];
            }
        } else {
            return null;
        }
    };
}