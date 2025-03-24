const { createOrder, updateOrder, deleteOrder } = require("../../controllers/admin/custom-order-controller");

const express = require("express");
const router = express.Router();

router.post("/createCustomOrder", createOrder);
router.put("/updateCustomOrder", updateOrder);
router.delete("/deleteCustomOrder", deleteOrder);

module.exports = router;