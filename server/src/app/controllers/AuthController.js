const jwt = require("jsonwebtoken");

const { JWT_PW } = process.env;
const AppError = require("../errors/AppError");
const UserRepository = require("../repository/UserRepository");
const utils = require("../utils");

class AuthController {
	/**
	 * Login route
	 * @param {String} email - Email of login user
	 * @param {String} password - Password of login user
	 * @return {String} token
	 */
	async login(req, res) {
		try {
			await utils.validateAuthData(req.body);
		} catch (error) {
			throw new AppError(error.message, 401);
		}

		const { email, password } = req.body;

		const user = await UserRepository.findOne({
			email,
			password
		}).select({ _id: 0, name: 1, email: 1 });

		if (!user) {
			throw new AppError("e-mail or password invalid", 401);
		}

		const token = jwt.sign({ ...user }, JWT_PW);

		res.status(200).send({ success: true, userData: user, token });
	}

	/**
	 * Auth route
	 */
	async auth(req, res) {
		let token = req.header("Authorization");
		token = token.split(" ")[1];

		const decoded = jwt.verify(token, JWT_PW);

		res.status(200).send(decoded._doc);
	}
}

module.exports = new AuthController();
