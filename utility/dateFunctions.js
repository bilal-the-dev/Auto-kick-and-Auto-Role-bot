const { duration } = require("./../config.json");
const isOlderThanTime = (age) => age < Date.now() - parseDate(duration);

const parseDate = function (timeStr) {
	const timeRegex = /^(\d+)([dshmw])$/;
	const match = timeStr.match(timeRegex);

	if (!match) {
		throw new Error("Invalid time format");
	}

	const value = parseInt(match[1]);
	const unit = match[2];

	const unitMultipliers = {
		d: 24 * 60 * 60 * 1000,
		h: 60 * 60 * 1000,
		m: 60 * 1000,
		s: 1000,
		w: 7 * 24 * 60 * 60 * 1000,
	};

	if (unit in unitMultipliers) return value * unitMultipliers[unit];
	else throw new Error("Invalid time unit");
};

module.exports = { isOlderThanTime };
