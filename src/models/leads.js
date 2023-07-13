const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
            default:""
		},
		last_name: {
			type: String,
            default:""
		},
        email: {
			type: String,
            default:""
		},
        phone_number: {
			type: String,
            default:""
		},
        plot_no: {
			type: String,
            default:""
		},
        property_id: {
			type: String,
            default:""
		}
	},
	{ timestamps: true }
);

const leads = mongoose.model("leads", leadsSchema);

module.exports = leads;


