const Joi = require("joi");
const errorFunction = require("../../utils/errorFunction");


const bookProperty = async (req, res, next) => {
	const validatorSchema = Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		email: Joi.string().required(),
		phone_number: Joi.string().required(),
		plot_no: Joi.string().required(),
		property_id: Joi.string().required(),
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


module.exports = { bookProperty};
