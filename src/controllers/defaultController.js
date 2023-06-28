const errorFunction = require("./../utils/errorFunction");

const defaultController = async (req, res, next) => {
	res.status(200);
	res.json(errorFunction(false, "Health check", "running...."));
};

module.exports = defaultController;
