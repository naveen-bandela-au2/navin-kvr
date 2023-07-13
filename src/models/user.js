const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
			type: String
		},
		phone_number:{
			type: String,
            default:""
		},
		avatar:{
			type:String,
			default:""
		},
		otp: {
			type: Number,
		},
        is_opt_used:{
            type:Boolean
        }
	},
	{ timestamps: true }
);

const user = mongoose.model("users", userSchema);

module.exports = user;


