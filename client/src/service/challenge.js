import __requestServer from "./requestServer";

/**
 * Encode api
 * @function encode
 * @returns {Array} Farms data
 */
export const encode = async number => {
  try {
    const response = await __requestServer({
      method: "GET",
      url: `challenge/encode/${number}`
    });
    return response.text;
  } catch (e) {
    return e.message;
  }
};

/**
 * Decode api
 * @function decode
 * @returns {Array} Farms data
 */
export const decode = async code => {
  try {
    const response = await __requestServer({
      method: "GET",
      url: `challenge/decode/${code}`
    });
    return response.text;
  } catch (e) {
    return e.message;
  }
};
