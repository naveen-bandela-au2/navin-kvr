const Joi = require("joi");
const errorFunction = require("../../utils/errorFunction");

// const validation = joi.object({
// 	userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
// 	email: joi.string().email().trim(true).required(),
// 	password: joi.string().min(8).trim(true).required(),
// 	mobileNumber: joi
// 		.string()
// 		.length(10)
// 		.pattern(/[6-9]{1}[0-9]{9}/)
// 		.required(),
// 	birthYear: joi.number().integer().min(1920).max(2000),
// 	skillSet: joi
// 		.array()
// 		.items(joi.string().alphanum().trim(true))
// 		.default([]),
// 	is_active: joi.boolean().default(true),
// });

// const userValidation = async (req, res, next) => {
// 	const payload = {
// 		userName: req.body.userName,
// 		email: req.body.email,
// 		password: req.body.password,
// 		mobileNumber: req.body.mobileNumber,
// 		birthYear: req.body.birthYear,
// 		skillSet: req.body.skillSet,
// 		is_active: req.body.is_active,
// 	};

// 	const { error } = validation.validate(payload);
// 	if (error) {
// 		res.status(406);
// 		return res.json(
// 			errorFunction(true, `Error in User Data : ${error.message}`)
// 		);
// 	} else {
// 		next();
// 	}
// };

const file = async (req, res, next) => {
	const validatorSchema = Joi.object({
		file: Joi.required(),
	});
	const { error } = validatorSchema.validate(req.file);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in User Data : ${error.message}`)
		);
	} else {
		next();
	}
};

const propertyValidation = async (req, res, next) => {
	const validatorSchema = Joi.object({
		project_type: Joi.string()
			.required()
			.valid("layout", "construction", "completed-project"),
		property_img: Joi.string().optional(),
		property_address: Joi.string().required(),
		property_name: Joi.string().required(),
		property_area: Joi.string().optional(),
		property_sold: Joi.string().optional(),
		property_facing: Joi.string().optional(),
		amenities: Joi.array().optional(),
		video: Joi.string().optional(),
		gallery: Joi.array().optional(),
		listed_by: Joi.string().optional(),
		extra_field: Joi.object().optional(),
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
const updatepropertyValidation = async (req, res, next) => {
	const validatorSchema = Joi.object({
		project_type: Joi.string()
			.valid("layout", "construction", "completed-project"),
		property_img: Joi.string().optional(),
		property_address: Joi.string(),
		property_name: Joi.string(),
		property_area: Joi.string().optional(),
		property_sold: Joi.string().optional(),
		property_facing: Joi.string().optional(),
		amenities: Joi.array().optional(),
		video: Joi.string().optional(),
		gallery: Joi.array().optional(),
		listed_by: Joi.string().optional(),
		extra_field: Joi.object().optional(),
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


module.exports = { updatepropertyValidation, file, propertyValidation };
