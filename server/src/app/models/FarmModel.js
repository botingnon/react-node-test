const { Schema, model } = require("mongoose");

const FarmSchema = new Schema(
	{
		farm_id: { type: Number, required: true },
		name: { type: String, required: true },
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
		culture: { type: String, required: true },
		variety: { type: String, required: true },
		total_area: { type: Number, required: true },
		yield_estimation: { type: Number, required: true },
		price: { type: Number, required: true },
		geoJson: { type: Schema.Types.Mixed, required: true }
	},
	{
		timestamps: true
	}
);

module.exports = model("Farm", FarmSchema);
