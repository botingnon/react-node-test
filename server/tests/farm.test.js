require("dotenv").config();
jest.setTimeout(30000);

const app = require("../src/app");
const request = require("supertest")(app);

const auth = {};
const farm = {
	farm_id: 1,
	name: "Farm 1",
	latitude: 4.68566,
	longitude: -74.21133,
	culture: "soybean",
	variety: "XXX1",
	total_area: 1000,
	yield_estimation: 60,
	price: 72,
	geoJson: {}
};

describe("Test farms path", () => {
	test("should require authorization", done => {
		request.get("/farms").expect(401, done);
	});

	test("must return authentication", done => {
		const run = () => {
			request
				.post("/login")
				.set("Accept", "application/json")
				.send({
					email: "admin@gaivota.ai",
					password: "admin"
				})
				.expect(200)
				.end(function(err, res) {
					auth.token = res.body.token;

					if (err) return done(err);
					return done();
				});
		};

		setTimeout(run, 1500);
	});

	test("should require farms", done => {
		request
			.get("/farms")
			.set("Accept", "application/json")
			.set("Authorization", `barear ${auth.token}`)
			.expect(200, done);
	});

	test("should create farm", done => {
		request
			.post("/farms")
			.set("Accept", "application/json")
			.set("Authorization", `barear ${auth.token}`)
			.send(farm)
			.expect(200, done);
	});

	test("should retry created farm", done => {
		request
			.get(`/farms/${farm.farm_id}`)
			.set("Accept", "application/json")
			.set("Authorization", `barear ${auth.token}`)
			.expect(200, done);
	});

	test("should delete created farm", done => {
		request
			.delete("/farms")
			.set("Accept", "application/json")
			.set("Authorization", `barear ${auth.token}`)
			.send(farm)
			.expect(200, done);
	});
});
