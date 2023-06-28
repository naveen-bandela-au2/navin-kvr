const express = require("express");
const {updatepropertyValidation,propertyValidation} = require("../controllers/property/validator");
const { createProperty,updateProperty,deleteProperty,getByPropertyType,getAllProperties } = require("../controllers/property");
const  upload  = require("../controllers/upload");
const defaultController = require("../controllers/defaultController");

const router = express.Router();

router.get("/", defaultController);


router.post("/property", propertyValidation, createProperty);
router.get("/property", getAllProperties);
router.patch("/property/:propertyId", updatepropertyValidation, updateProperty);
router.delete("/property/:propertyId", deleteProperty);
router.get("/property/:propertyType", getByPropertyType);




router.post('/property/file-upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
  
    res.json({ message: 'File uploaded successfully', fileUrl: req.file.location });
  });
  

module.exports = router;
