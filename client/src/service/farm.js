import __requestServer from "./requestServer";

/**
 * Find all Farms
 * @function findAll
 * @returns {Array} Farms data
 */
export const findAll = async () => {
  try {
    const farms = await __requestServer({ method: "GET", url: "farms" });
    return farms.rows;
  } catch (e) {
    return [];
  }
};

/**
 * Find Farm by id
 * @function find
 * @params {number} farm_id
 * @returns {Object} Farm data
 */
export const find = async farm_id => {
  try {
    const farm = await __requestServer({
      method: "GET",
      url: `farms/${farm_id}`
    });
    return farm;
  } catch (e) {
    return null;
  }
};

/**
 * Update or insert farm
 * @function upsert
 * @params {Object} Farm data
 * @returns {Object} Farm data
 */
export const upsert = async farm => {
  try {
    const result = await __requestServer({
      method: "POST",
      url: "farms",
      body: farm
    });
    return result;
  } catch (e) {
    return null;
  }
};

/**
 * Delete farm
 * @function deleteFarm
 * @params {Object} Farm data
 * @returns {Object} Farm data
 */
export const deleteFarm = async farm => {
  try {
    const result = await __requestServer({
      method: "DELETE",
      url: "farms",
      body: farm
    });
    return result;
  } catch (e) {
    return null;
  }
};

/**
 * Fecth Chart Data
 * @function fecthChartData
 * @params {number} farm_id
 * @returns {Array} Chart data
 */
export const fecthChartData = async farm_id => {
  try {
    const ndvi = await __requestServer({
      method: "GET",
      url: `farms/${farm_id}/ndvi-precipitation/chart`
    });

    if (ndvi.rows.length === 0) {
      return [];
    }

    const result = [["Month", "NDVI", "Precipitation"]];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    for (let index = 0; index < ndvi.rows.length; index++) {
      const item = ndvi.rows[index];

      result.push([
        monthNames[new Date(item.date).getMonth()],
        item.ndvi,
        item.precipitation
      ]);
    }

    return result;
  } catch (e) {
    return [];
  }
};

/**
 * Fecth NDVI precipitation Data
 * @function fecthNdviPrecipitationData
 * @params {number} farm_id
 * @returns {Array} data
 */
export const fecthNdviPrecipitationData = async farm_id => {
  try {
    const result = await __requestServer({
      method: "GET",
      url: `farms/${farm_id}/ndvi-precipitation`
    });

    return result.rows;
  } catch (e) {
    return [];
  }
};
