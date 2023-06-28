const PropertyModel = require("../../models/property");
const errorFunction = require("../../utils/errorFunction");
const securePassword = require("../../utils/securePassword");

// const addUser = async (req, res, next) => {
// 	try {
// 		const existingUser = await User.findOne({
// 			email: req.body.email,
// 		}).lean(true);
// 		if (existingUser) {
// 			res.status(403);
// 			return res.json(errorFunction(true, "User Already Exists"));
// 		} else {
// 			const hashedPassword = await securePassword(req.body.password);
// 			const newUser = await User.create({
// 				userName: req.body.userName,
// 				email: req.body.email,
// 				password: hashedPassword,
// 				mobileNumber: req.body.mobileNumber,
// 				birthYear: req.body.birthYear,
// 				skillSet: req.body.skillSet,
// 				is_active: req.body.is_active,
// 			});
// 			if (newUser) {
// 				res.status(201);
// 				return res.json(
// 					errorFunction(false, "User Created", newUser)
// 				);
// 			} else {
// 				res.status(403);
// 				return res.json(errorFunction(true, "Error Creating User"));
// 			}
// 		}
// 	} catch (error) {
// 		res.status(400);
// 		console.log(error);
// 		return res.json(errorFunction(true, "Error Adding user"));
// 	}
// };

// const getUsers = async (req, res, next) => {
// 	try {
// 		const allUsers = await User.find();
// 		if (allUsers) {
// 			res.status(201);
// 			return res.json(
// 				errorFunction(false, "Sending all users", allUsers)
// 			);
// 		} else {
// 			res.status(403);
// 			return res.json(errorFunction(true, "Error getting Users"));
// 		}
// 	} catch (error) {
// 		res.status(400);
// 		return res.json(errorFunction(true, "Error getting user"));
// 	}
// };

const addUser = () => { },
	getUsers = () => { };

const createProperty = async (req, res, next) => {
	try {
		const newProperty = await PropertyModel.create(req.body);
		if (newProperty) {
			res.status(201);
			return res.json(
				errorFunction(false, "Property added successfully", newProperty)
			);
		} else {
			res.status(403);
			return res.json(errorFunction(true, "Error while adding property"));
		}
	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, "Error while adding property"));
	}
};

const updateProperty = async (req, res, next) => {
	const { propertyId } = req.params;

	try {
		const updatedproperty = await PropertyModel.findByIdAndUpdate(
			propertyId,
			req.body,
			{ new: true }
		);

		if (!updatedproperty) {
			return res.status(404).json({ error: "property not found" });
		}

		return res.json(updatedproperty);
	} catch (error) {
		res.status(400).json(errorFunction(true, "Error while updating property"));
	}
};

const deleteProperty = async (req, res, next) => {
	const { propertyId } = req.params;

	try {
		const deletedproperty = await PropertyModel.findByIdAndRemove(propertyId);

		if (deletedproperty) {
			return res
				.status(200)
				.json({ message: "Property deleted successfully." });
		} else {
			return res.status(404).json({ message: "Property not found." });
		}
	} catch (error) {
		return res.status(500).json({ message: "Error deleting property." });
	}
};

const getByPropertyType = async (req, res, next) => {
	const { propertyType } = req.params;
	try {
		const properties = await PropertyModel.find({ project_type: propertyType });
			res.json(properties);
	} catch (error) {
		return res.status(500).json({ message: "Server Error" });
	}
};

const getAllProperties = async (req, res, next) => {
	try {
		const properties = await PropertyModel.find();
			res.json(properties);
	} catch (error) {
		return res.status(500).json({ message: "Server Error" });
	}
};

module.exports = {
	createProperty,
	updateProperty,
	deleteProperty,
	getByPropertyType,
	getAllProperties
};
