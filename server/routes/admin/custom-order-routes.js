const { createOrder, updateOrder, deleteOrder, getAllCustomOrders } = require("../../controllers/admin/custom-order-controller");

const express = require("express");
const router = express.Router();

router.post("/createCustomOrder", createOrder);
router.get("/getCustomOrders", getAllCustomOrders)
router.put("/updateCustomOrder/:id", updateOrder);
router.delete("/deleteCustomOrder/:id", deleteOrder);

module.exports = router;