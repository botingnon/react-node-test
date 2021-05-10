const utils = require("../utils");

class ChallengeController {
	/**
	 * Encode route
	 * @param {String} number - Number to encode
	 * @return {String} token
	 */
	async encode(req, res) {
		const { number } = req.params;

		res.status(200).json({ text: utils.encode(number) });
	}

	/**
	 * Decode route
	 * @param {String} code - Code to decode
	 * @return {String} token
	 */
	async decode(req, res) {
		const { code } = req.params;
		const decoded = utils.decode(code);

		res.status(200).json({ text: decoded.toString() });
	}
}

module.exports = new ChallengeController();
