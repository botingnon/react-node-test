const { getDebug } = require("./app/utils");
const { PORT } = process.env;

const log = getDebug("server");

const app = require("./app");
app.listen(PORT, () => {
	log(`Server running on port ${PORT}`);
});
