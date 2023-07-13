const LeadsModel = require("../../models/leads");
const errorFunction = require("../../utils/errorFunction");


const create_lead = async (req, res, next) => {
	try {
       const is_existing = await LeadsModel.findOne({...req.body})
if(!is_existing)
{
		const newProperty = await LeadsModel.create({...req.body});
		if (newProperty) {
			res.status(201);
			return res.json(
				errorFunction(false, "Property successfully booked", newProperty)
			);
		} else {
			res.status(403);
			return res.json(errorFunction(true, "Error while booking property"));
		}
    }
    else{
        return res.json(errorFunction(true, "property is already booked by you"));   
    }

	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, error+"Error while booking property"));
	}
};

const getLeads = async (req, res, next) => {
	try {
       const leads = await LeadsModel.find()
if(leads)
{
		
			res.status(201);
			return res.json(
				errorFunction(false, "Property booked", leads)
			);
		
    }
    else{
        return res.json(errorFunction(true, "no property booked yet"));   
    }

	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, error+"Error while getting booking property"));
	}
};



module.exports = {
	create_lead,
    getLeads
};
