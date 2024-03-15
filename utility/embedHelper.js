const { EmbedBuilder } = require("discord.js");
const generateEmbed = function (title, fields, avatar) {
	const embed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle(title)

		.setThumbnail(avatar)
		.addFields(...fields)

		.setTimestamp();

	return embed;
};
const sendEmbed = async function (embed, guild) {
	const logChannel = await guild.channels.fetch(process.env.LOG_CHANNEL_ID);
	await logChannel.send({ embeds: [embed] });
};

module.exports = { generateEmbed, sendEmbed };
