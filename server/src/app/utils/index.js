const Hashids = require("hashids/cjs");
const Yup = require("yup");
const debug = require("debug")("server");
const hashids = new Hashids("", 6);

/**
 * Get debug with namespace
 */
exports.getDebug = namespace => {
	return debug.extend(namespace);
};

/**
 * Encode value
 */
exports.encode = value => {
	return hashids.encode(value);
};

/**
 * Decode value
 */
exports.decode = value => {
	return hashids.decode(value);
};

/**
 * Validate auth body params
 */
exports.validateAuthData = body => {
	const schema = Yup.object().shape({
		email: Yup.string()
			.email()
			.required(),
		password: Yup.string().required()
	});

	return schema.validate(body, { abortEarly: false });
};
