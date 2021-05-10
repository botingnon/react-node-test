const mongoose = require("mongoose");
const { url } = require("../config/mongo.js");
const { getDebug } = require("../app/utils");

const log = getDebug("mongodb");
const error = log.extend("error");

const UserRepository = require("../app/repository/UserRepository");

class Database {
	async init() {
		try {
			mongoose.connection.on("open", async () => {
				log(`Mongo connected: ${url}`);

				await UserRepository.deleteMany({ email: "admin@gaivota.ai" });

				await UserRepository.create({
					name: "Admin",
					email: "admin@gaivota.ai",
					password: "admin"
				});

				log("Admin inserted");
			});

			mongoose.connection.on("error", err => {
				error(`Mongo connection error: ${err}`);
			});

			await mongoose.connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			});
		} catch (err) {
			error(`Mongo connection error: ${err.message}`);
		}
	}
}

module.exports = new Database();
