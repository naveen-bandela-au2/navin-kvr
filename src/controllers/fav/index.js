const FavsModel = require("../../models/favs");
const PropertyModel = require("../../models/property");
const errorFunction = require("../../utils/errorFunction");
var ObjectID = require('mongodb').ObjectID;


const addToFav = async (req, res, next) => {
	try {
       const is_existing = await FavsModel.findOne({...req.body})
if(!is_existing)
{
		const newProperty = await FavsModel.create({...req.body});
		if (newProperty) {
			res.status(201);
			return res.json(
				errorFunction(false, "Property added to favs successfully", newProperty)
			);
		} else {
			res.status(403);
			return res.json(errorFunction(true, "Error while adding property to favs"));
		}
    }
    else{
        return res.json(errorFunction(true, "property is already to favs"));   
    }

	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, error+"Error while adding property to favs"));
	}
};

const deleteFromFav = async (req, res, next) => {
	try {
       const remove = await FavsModel.deleteOne({...req.body})
	   res.status(201);
			return res.json(
				errorFunction(false, "Property deleted from favs successfully", newProperty)
			);

	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, error+"Error while deleting property from favs"));
	}
};

const getAllFav = async (req, res, next) => {
	try {

     const  newProperty= await FavsModel.find({email:req.body.email}, );

         const new_ids = newProperty.map((item)=>ObjectID (item.property_id))
        const list = await PropertyModel.find({ _id: { $in: new_ids } })
		if (newProperty) {
			res.status(201);
			return res.json(
				errorFunction(false, "list of favs property",list)
			);
		} else {
			res.status(403);
			return res.json(errorFunction(true, "Error while getting property to favs"));
		}
	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, error+"Error while getting property to favs"));
	}
};

module.exports = {
	addToFav,
    getAllFav,
	deleteFromFav
};
