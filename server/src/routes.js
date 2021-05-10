const { Router } = require("express");

const AuthController = require("./app/controllers/AuthController");
const ChallengeController = require("./app/controllers/ChallengeController");
const FarmController = require("./app/controllers/FarmController");
const NdviPrecipitationController = require("./app/controllers/NdviPrecipitationController");

const checkAuth = require("./app/middlewares/checkAuth");

const routes = new Router();

routes.post("/login", AuthController.login);
routes.get("/auth", AuthController.auth);

routes.get("/farms", checkAuth, FarmController.index);
routes.post("/farms", checkAuth, FarmController.upsert);
routes.delete("/farms", checkAuth, FarmController.delete);
routes.get("/farms/:farm_id(\\d+)", checkAuth, FarmController.detail);
routes.get(
	"/farms/:farm_id(\\d+)/ndvi-precipitation",
	checkAuth,
	NdviPrecipitationController.index
);
routes.get(
	"/farms/:farm_id(\\d+)/ndvi-precipitation/chart",
	checkAuth,
	NdviPrecipitationController.chart
);

routes.get("/challenge/encode/:number([\\d]{1,8})", ChallengeController.encode);
routes.get("/challenge/decode/:code", ChallengeController.decode);

routes.get("/", (req, res) => {
	res.status(200).send("Gaivota Test");
});

module.exports = routes;
