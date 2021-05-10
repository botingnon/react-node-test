import fetchJsonp from "fetch-jsonp";

const baseApi =
  "https://api.opencagedata.com/geocode/v1/json?key=af47043111a44ffabe660ec577102372&pretty=1&no_annotations=1&q=";

/**
 * Geocoder api
 * @function geocoder
 * @param latitude
 * @param longitude
 * @returns {Array} Farms data
 */
export const geocoder = async (latitude, longitude) => {
  try {
    const response = await fetchJsonp(`${baseApi}${latitude},${longitude}`);
    if (response.ok) {
      const result = await response.json();
      return result.results[0].formatted;
    }
    return "";
  } catch (e) {
    return e.message;
  }
};
