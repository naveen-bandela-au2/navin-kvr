const Joi = require("joi");
const errorFunction = require("../../utils/errorFunction");


const updateUserValidation = async (req, res, next) => {
	const validatorSchema = Joi.object({
		first_name: Joi.string().optional(),
		last_name: Joi.string().optional(),
		phone_number: Joi.string().optional(),
		avatar: Joi.string().optional(),
		email:Joi.string().required()
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


module.exports = { updateUserValidation};
