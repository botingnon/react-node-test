const request = require("supertest");
const app = require("../src/app");

const number = "12345678";
const code = "1rQ2go";

describe("Test the challanger path", () => {
	test("It should number encode", done => {
		return request(app)
			.get(`/challenge/encode/${number}`)
			.set("Accept", "application/json")
			.expect(
				200,
				{
					text: code
				},
				done
			);
	});

	test("It should code decode", done => {
		return request(app)
			.get(`/challenge/decode/${code}`)
			.set("Accept", "application/json")
			.expect(
				200,
				{
					text: number
				},
				done
			);
	});
});
