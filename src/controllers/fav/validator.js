const Joi = require("joi");
const errorFunction = require("../../utils/errorFunction");


const addFavValidation = async (req, res, next) => {
	const validatorSchema = Joi.object({
		property_id: Joi.string().required(),
		email: Joi.string().required(),
	});
	const { error } = validatorSchema.validate(req.body);
	if (error) {
		console.log(error)
		const errorMessage = error.details.map((d) => d.message);
		res.status(404);
		return res.json(
			errorFunction(true, `Bad Request Error : ${errorMessage}`)
		);
	} else {
		next();
	}
};


module.exports = { addFavValidation};
