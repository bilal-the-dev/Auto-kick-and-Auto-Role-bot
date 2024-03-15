const {
	Client,
	Events,
	IntentsBitField: { Flags },
} = require("discord.js");
const dotenv = require("dotenv");
const cron = require("node-cron");

const { check } = require("./utility/members");
const { kick, role } = require("./config.json");
dotenv.config({ path: ".env" });

const { TOKEN, GUILD_ID } = process.env;

const client = new Client({
	intents: [
		Flags.Guilds,
		Flags.MessageContent,
		Flags.GuildMessages,
		Flags.GuildPresences,
		Flags.GuildMembers,
	],
});

client.once(Events.ClientReady, async (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	const init = async function () {
		try {
			console.log("Running every mid-night");
			if (kick && role)
				return console.log("Either Kick or Role should be true in config");
			const guild = readyClient.guilds.cache.get(GUILD_ID);
			const members = await guild.members.fetch();

			await check(members.values());
		} catch (error) {
			console.log(error);
		}
	};

	cron.schedule("30 * * * *", init);

	init();
});

client.login(TOKEN);
