const { Schema, model } = require("mongoose");

const NdviPrecipitationSchema = new Schema(
	{
		farm_id: { type: Number, required: true },
		date: { type: Date, required: true },
		ndvi: { type: Number, required: true },
		precipitation: { type: Number, required: true }
	},
	{
		timestamps: true
	}
);

module.exports = model("NdviPrecipitation", NdviPrecipitationSchema);
