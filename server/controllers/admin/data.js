const CodOrder = require("../../models/CodOrder.js")
const CustomOrder  = require("../../models/CustomOrder.js");
const EsewaOrder   = require("../../models/EsewaOrder.js");
const express = require("express")

const router = express.Router();

router.get("/daily", async (req, res) => {
  try {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setHours(0, 0, 0, 0); // Start of day in UTC

    const endOfLastMonth = new Date();
    endOfLastMonth.setDate(0); // Last day of previous month
    endOfLastMonth.setHours(23, 59, 59, 999); // End of day in UTC

    // Function to get daily orders from a collection
    const getDailyOrders = async (model) => {
      return model.aggregate([
        { $match: { createdAt: { $gte: lastMonth } } }, // Filter last month orders
        {
          $group: {
            _id: { $dayOfMonth: "$createdAt" }, // Group by day
            total: { $sum: 1 }, // Count orders
          },
        },
        { $sort: { _id: 1 } } // Ensure sorted by date
      ]);
    };

    // Fetch orders from all collections
    const [codOrders, customOrders, esewaOrders] = await Promise.all([
      getDailyOrders(CodOrder),
      getDailyOrders(CustomOrder),
      getDailyOrders(EsewaOrder),
    ]);

    // Merging data from all three collections
    const combinedData = {};

    const mergeOrders = (orders) => {
      orders.forEach(({ _id, total }) => {
        if (!combinedData[_id]) combinedData[_id] = { day: _id, totalOrders: 0 };
        combinedData[_id].totalOrders += total;
      });
    };

    mergeOrders(codOrders);
    mergeOrders(customOrders);
    mergeOrders(esewaOrders);

    // Convert object to sorted array
    const finalData = Object.values(combinedData).sort((a, b) => a.day - b.day);

     res.status(200).json({
        success: true,
        data: finalData
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = router;
