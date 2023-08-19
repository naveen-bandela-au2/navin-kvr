const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
	{
		image: {
			type: String,
            default:""
		},
		idx: {
			type: Number,
		},
        extra:{
            type:Object,
            default: {}
        }
	},
	{ timestamps: true }
);

const banners = mongoose.model("banners", bannerSchema);

module.exports = banners;


