const express = require("express");
const {
    getFeatureImage,
    addFeatureImage

} = require("../../controllers/common/feature-controller")

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImage);

module.exports = router;