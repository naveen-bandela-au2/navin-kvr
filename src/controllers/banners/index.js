const BannerModel = require("../../models/banner");
const errorFunction = require("../../utils/errorFunction");
var ObjectID = require('mongodb').ObjectID;

const addBanner = async(req, res, next)=> {
    try {
        const options = {
            upsert: true, 
            new: true, 
            setDefaultsOnInsert: true
        };

        const result = await BannerModel.findOneAndUpdate({ idx: req.params.id }, req.body, options);
        return res.json( errorFunction(false, "Banner added successfully", result))
    } catch (error) {
        res.status(400);
		return res.json(errorFunction(true, error+"Error while adding banner"));
    }
}

const getAllBanners = async (req, res, next) => {
	try {
		const banner = await BannerModel.find();
			res.json(banner);
	} catch (error) {
		return res.status(500).json({ message: "Server Error" });
	}
};


const deleteBanner = async (req, res, next) => {
    try {
        // Assuming BannerModel is your Mongoose model for banners
        const result = await BannerModel.findOneAndDelete({ idx: req.params.id });

        if (result) {
            return res.json(errorFunction(false, "Banner deleted successfully", result));
        } else {
            return res.json(errorFunction(true, "Banner not found"));
        }
    } catch (error) {
        res.status(400);
        return res.json(errorFunction(true, error + "Error while deleting banner"));
    }
};

module.exports = {
	addBanner,
    getAllBanners,
    deleteBanner
};
