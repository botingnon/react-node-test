const NdviPrecipitationRepository = require("../repository/NdviPrecipitationRepository");

class NdviPrecipitationController {
	/**
	 * Farm x nvdi precipitation list
	 * @param {String} farm_id - Id farm
	 * @return {Array} ndvi
	 */
	async index(req, res) {
		const { farm_id } = req.params;

		const rows = await NdviPrecipitationRepository.aggregate([
			{ $match: { farm_id: parseInt(farm_id) } },
			{
				$project: {
					_id: 1,
					date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
					ndvi: 1,
					precipitation: 1
				}
			},
			{ $sort: { date: 1 } }
		]);

		res.status(200).json({ success: true, rows, total: rows.length });
	}

	/**
	 * Farm nvdi precipitation chart list
	 * @param {String} farm_id - Id farm
	 * @return {Array} ndvi
	 */
	async chart(req, res) {
		const { farm_id } = req.params;

		const rows = await NdviPrecipitationRepository.aggregate([
			{ $match: { farm_id: parseInt(farm_id) } },
			{
				$group: {
					_id: { $dateToString: { format: "%m", date: "$date" } },
					ndvi: { $sum: "$ndvi" },
					precipitation: { $sum: "$precipitation" }
				}
			},
			{ $project: { _id: 0, date: "$_id", ndvi: 1, precipitation: 1 } },
			{ $sort: { date: 1 } }
		]);

		res.status(200).json({ success: true, rows, total: rows.length });
	}
}

module.exports = new NdviPrecipitationController();
