const jwt = require("jsonwebtoken");
const { JWT_PW } = process.env;
const AppError = require("../errors/AppError");

module.exports = async (req, res, next) => {
	let token = req.header("Authorization");
	if (!token) {
		throw new AppError("not authorized", 401);
	}

	token = token.split(" ")[1];

	try {
		jwt.verify(token, JWT_PW);
		return next();
	} catch (error) {
		throw new AppError("not authorized", 401);
	}
};
