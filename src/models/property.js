const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
	{
		project_type: {
			type: String,
		},
		property_img: {
			type: String,
		},
		property_address: {
			type: String,
		},
		property_name: {
			type: String,
		},
		property_area: {
			type: String,
		},
		property_sold: {
			type: String,
		},
		property_facing: {
			type: String,
		},
		amenities: {
			type: Array,
			default:[]	
		},
		video: {
			type: String,
		},
		gallery: {
			type: Array,
			default:[]	
		},
		listed_by: {
			type: String,
		},
		plots_available:{
			type:Number
		},
		views:{
			type:Number,
			default:0
		},
		extra_field: {
			type: Object,
		}
	},
	{ timestamps: true }
);

const property_details = mongoose.model("property_details", propertySchema);

module.exports = property_details;


