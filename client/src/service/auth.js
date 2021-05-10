import __requestServer from "./requestServer";

/**
 * Checks if a user is authenticated, returns the user data
 * @function isAuthenticated
 * @returns {Promise<Object>} User data
 */
export const isAuthenticated = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = await __requestServer({ method: "GET", url: "auth" });
        return Promise.resolve(userData);
      } catch (e) {
        localStorage.removeItem("token");
        return Promise.reject();
      }
    }
    return Promise.reject();
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Autenticates a user
 * @function authenticate
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {Promise<Object>} User data
 */
export const authenticate = async (email, password) => {
  if (email && password) {
    try {
      const data = await __requestServer({
        method: "POST",
        url: "login",
        body: {
          email,
          password
        }
      });
      const { token, userData } = data;
      if (token) {
        localStorage.setItem("token", token);
        return Promise.resolve(userData);
      }
      return Promise.reject();
    } catch (err) {
      return Promise.reject(err);
    }
  }
};

/**
 * Logout the user
 * @function logout
 */
export const logout = () => {
  localStorage.removeItem("token");
};
