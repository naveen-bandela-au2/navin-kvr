const express = require("express");
const {updatepropertyValidation,propertyValidation} = require("../controllers/property/validator");
const {updateUserValidation} = require("../controllers/user/validator");
const {bookProperty} = require("../controllers/leads/validator");
const { createProperty,updateProperty,deleteProperty,getByPropertyType,getAllProperties, updatePropertyViews } = require("../controllers/property");

const {addFavValidation} = require("../controllers/fav/validator");
const { addToFav,getAllFav, deleteFromFav } = require("../controllers/fav");
const { create_lead,getLeads } = require("../controllers/leads");
const { sendOTP,reSendOTP,verifyOTP,updateUser,getUser,getAllUser } = require("../controllers/user");
const  upload  = require("../controllers/upload");
const defaultController = require("../controllers/defaultController");
const { addBanner, getAllBanners } = require("../controllers/banners");

const router = express.Router();

router.get("/", defaultController);


router.post("/property", propertyValidation, createProperty);
router.get("/property", getAllProperties);
router.patch("/property/:propertyId", updatepropertyValidation, updateProperty)
router.delete("/property/:propertyId", deleteProperty);
router.get("/property/:propertyType", getByPropertyType);
router.patch("/property-views-inc/:propertyId",updatePropertyViews);




router.post('/property/file-upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
  
    res.json({ message: 'File uploaded successfully', fileUrl: req.file.location });
  });

router.post("/send-otp", sendOTP);
router.post("/re-send-otp", reSendOTP);
router.post("/verify-otp", verifyOTP);
router.patch("/update-user",updateUserValidation,updateUser)  
router.post("/get-user",getUser)  
router.get("/get-all-user",getAllUser)  

router.post("/add-to-fav",addFavValidation,addToFav)
router.delete("/delete-from-fav",addFavValidation,deleteFromFav)
router.post("/get-all-fav",getAllFav)

router.post("/book-property",bookProperty,create_lead)

router.get("/book-property",getLeads)


router.post("/update-banner/:id",addBanner)

router.get("/get-banners",getAllBanners)



module.exports = router;
