const AppError = require("../errors/AppError");
const FarmRepository = require("../repository/FarmRepository");
const NdviPrecipitationRepository = require("../repository/NdviPrecipitationRepository");

class FarmController {
	/**
	 * Farms list
	 * @return {Array} farms
	 */
	async index(req, res) {
		const farms = await FarmRepository.find().select({ _id: 0 });

		res.status(200).json({ success: true, rows: farms, total: farms.length });
	}

	/**
	 * Farm detail
	 * @param {String} farm_id - Id farm
	 * @return {Array} farms
	 */
	async detail(req, res) {
		const { farm_id } = req.params;
		const farm = await FarmRepository.findOne({ farm_id }).select({ _id: 0 });

		if (!farm) {
			throw new AppError("farm not found", 404);
		}

		res.status(200).json(farm);
	}

	/**
	 * Update or insert farm
	 * @param {Object} farm
	 * @return {Object} farm
	 */
	async upsert(req, res) {
		const { farm_id, ndvi_precipitation } = req.body;
		if (!farm_id) {
			throw new AppError("farm_id not found", 404);
		}

		const filter = { farm_id };
		const update = req.body;

		delete update.ndvi_precipitation;

		const doc = await FarmRepository.findOneAndUpdate(filter, update, {
			new: true,
			upsert: true
		});

		await NdviPrecipitationRepository.deleteMany(filter);
		if (Array.isArray(ndvi_precipitation)) {
			await NdviPrecipitationRepository.insertMany(
				ndvi_precipitation.map(item => {
					delete item._id;

					item.farm_id = farm_id;

					return item;
				})
			);
		}

		res.status(200).json(doc);
	}

	/**
	 * Delete farm
	 * @param {Object} farm
	 * @return {Object} farm
	 */
	async delete(req, res) {
		const { farm_id } = req.body;
		if (!farm_id) {
			throw new AppError("farm_id not found", 404);
		}

		const filter = { farm_id };

		await FarmRepository.deleteOne(filter);
		await NdviPrecipitationRepository.deleteMany(filter);

		res.status(200).json(req.body);
	}
}

module.exports = new FarmController();
