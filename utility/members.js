const { isOlderThanTime } = require("./dateFunctions");
const { generateEmbed, sendEmbed } = require("./embedHelper");
const { kick, role } = require("./../config.json");

const check = async (members) => {
	for (const member of members) {
		const {
			user: { createdTimestamp, bot },
			guild,
		} = member;

		if (bot) continue;

		let type = "";

		if (kick) {
			const hasKicked = await kickMember(createdTimestamp, member);
			if (!hasKicked) continue;
			type = "Member kicked 💥";
		}

		if (role) {
			const result = await checkForRole(createdTimestamp, member);
			if (!result) continue;
			type = `Role ${result} 💥`;
		}

		const fields = [
			{
				name: "Target",
				value: `${member}`,
			},
			{
				name: "Account age",
				value: `<t:${Math.floor(createdTimestamp / 1000)}:f>`,
			},
		];
		const embed = generateEmbed(type, fields, member.displayAvatarURL());
		await sendEmbed(embed, guild);
	}
};

const checkForRole = async (timestamp, member) => {
	try {
		if (isOlderThanTime(timestamp)) {
			if (!member.roles.cache.has(process.env.ROLE_ID)) return;
			await member.roles.remove(process.env.ROLE_ID);

			return "removed";
		} else {
			if (member.roles.cache.has(process.env.ROLE_ID)) return;

			await member.roles.add(process.env.ROLE_ID);

			return "added";
		}
	} catch (error) {
		console.log(error.message + " " + member.user.username);
	}
};

const kickMember = async function (timestamp, member) {
	if (isOlderThanTime(timestamp)) return;

	await member
		.kick()
		.catch((error) => console.log(error.message + " " + member.user.username));

	return true;
};
module.exports = { kickMember, check };
