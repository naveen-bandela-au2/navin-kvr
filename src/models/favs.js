const mongoose = require("mongoose");

const favsSchema = new mongoose.Schema(
	{
		property_id: {
			type: String,
            default:""
		},
		email: {
			type: String,
            default:""
		}
	},
	{ timestamps: true }
);

const favs = mongoose.model("favs", favsSchema);

module.exports = favs;


