const express = require("express");
const cors = require("cors");
const Youch = require("youch");

require("express-async-errors");
const { getDebug } = require("./app/utils");
const error = getDebug("app");

const AppError = require("./app/errors/AppError");

const database = require("./database");
const routes = require("./routes");

class App {
	constructor() {
		this.database();

		this.server = express();

		this.middlewares();
		this.routes();
		this.exceptionHandler();
	}

	middlewares() {
		this.server.use(cors());
		this.server.use(express.json());
		this.server.use(
			express.urlencoded({
				extended: true
			})
		);
	}

	routes() {
		this.server.use(routes);
	}

	async database() {
		await database.init();
	}

	exceptionHandler() {
		// eslint-disable-next-line
		this.server.use(async (err, req, res, next) => {
			error(err);

			if (err instanceof AppError) {
				return res
					.status(err.statusCode)
					.json({ success: false, message: err.message });
			}

			if (process.env.NODE_ENV === "development") {
				const errors = await new Youch(err, req).toJSON();

				return res.status(500).json(errors);
			}

			return res.status(500).json({ error: "Internal server error" });
		});
	}
}

module.exports = new App().server;
