const UserModel = require("../../models/user");
const errorFunction = require("../../utils/errorFunction");
const { sendEmail } = require("../../utilities/emailservice");

function otpGenerator() {
    var min = 100000; 
    var max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const sendOTP = async (req, res, next) => {
    try {
      otp=otpGenerator();
        const newUser = await UserModel.updateOne(
            { email: req.body.email },
            { otp, is_opt_used: false },
            { upsert: true, new: true }
        );
        sendEmail(req.body.email, otp);
        if (newUser) {
            res.status(201);
            return res.json(errorFunction(false, "opt sent successfully"));
        } else {
            res.status(400);
            return res.json(errorFunction(true, `Error while adding user`));
        }
    } catch (error) {
        res.status(400);
        return res.json(errorFunction(true, `${error}Error while adding user`));
    }
};

const reSendOTP = async (req, res, next) => {
    try {
        const newUser = await UserModel.findOne(
            { email: req.body.email }
        );
        if (newUser?.otp) {
            await UserModel.findOne(
                { email: req.body.email },
                { is_opt_used: false }
            );
            sendEmail(req.body.email, newUser.otp);
        }
        if (newUser) {
            res.status(201);
            return res.json(errorFunction(false, "opt sent successfully"));
        }
    } catch (error) {
        res.status(400);
        return res.json(errorFunction(true, `${error} Error while adding user`));
    }
};

const verifyOTP = async (req, res, next) => {
    try {
        const newUser = await UserModel.findOne(
            { email: req.body.email }
        );
        if (newUser?.otp) {
            if(newUser.is_opt_used){
                return res.json(errorFunction(true, "otp is invalid becaused it is already verified"));
            }
            else if (newUser.otp===req.body.otp) {
                await UserModel.findOne(
                    { email: req.body.email },
                    { is_opt_used: true }
                );
                return res.json(errorFunction(false, "verified successfully", newUser));
            } else {
                return res.json(errorFunction(true, "otp is invalid"));
            }
        } else {
            return res.json(errorFunction(true, "user not found"));
        }
    } catch (error) {
        res.status(400);
        return res.json(errorFunction(true, `${error} Error while adding user`));
    }
};

const updateUser = async (req, res, next) => {
	const { email,...rest } = req.body;
	try {
		const updatedproperty = await UserModel.findOneAndUpdate(
			{email},
			{...rest},
            {new:true}
		);

		if (!updatedproperty) {
			return res.status(404).json({ error: "user not found" });
		}

		return res.json(updatedproperty);
	} catch (error) {
		res.status(400).json(errorFunction(true, "Error while updating user"));
	}
};

const getUser = async (req, res, next) => {
	const { email } = req.body;
	try {
		const updatedproperty = await UserModel.findOne(
			{email},
            { otp: 0}
		);

		if (!updatedproperty) {
			return res.status(404).json({ error: "user not found" });
		}

		return res.json(updatedproperty);
	} catch (error) {
		res.status(400).json(errorFunction(true, "Error while getting user"));
	}
};

const getAllUser = async (req, res, next) => {
	try {
		const updatedproperty = await UserModel.find(
			{},
            { otp: 0}
		);

		if (!updatedproperty) {
			return res.status(404).json({ error: "users not found" });
		}

		return res.json(updatedproperty);
	} catch (error) {
		res.status(400).json(errorFunction(true, "Error while getting users"));
	}
};

const deleteUser = async (req, res, next) => {
    const { email } = req.body;

    try {
        const deletedUser = await UserModel.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        return res.status(500).json({ error: "Error while deleting user" });
    }
};



module.exports = {
    sendOTP,
    reSendOTP,
    verifyOTP,
    updateUser,
    getUser,
    getAllUser,
    deleteUser
};
