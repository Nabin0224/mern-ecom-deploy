const  Order  = require('../../models/Order')
const EsewaOrder = require('../../models/EsewaOrder')
const CodOrder = require("../../models/CodOrder")

const getAllOrdersofAllUser = async(req, res)=> {
try {
  
  const paypalorders = await Order.find({})
  const esewaorders = await EsewaOrder.find({});
  const codorders = await CodOrder.find({})   // returns array of orders present in the database 

  if(paypalorders.length === 0 && esewaorders.length === 0 && codorders.length === 0 ) {
     return res.status(404).json({
      success: false,
      message: "No admin orders found!"
    })
  }
  // if(esewaorders.length === 0 ) {
  //    return res.status(404).json({
  //     success: false,
  //     message: "No esewa orders found!"
  //   })
  // }
  // if(codorders.length === 0 ) {
  //    return res.status(404).json({
  //     success: false,
  //     message: "No cod orders found!"
  //   })
  // }

  const orders = [...paypalorders, ...esewaorders, ...codorders]
  return res.status(200).json({
    success: true,
    data: orders,
  })
} catch (error) {
  return res.status(500).json({
    success: false,
    message: "Some error occured",
    error: error.message,
  })
}
}

const getOrderDetailsForAdmin = async(req, res)=> {
  try{
  const {id} = req.params;
  console.log("id in admin detials ok ", id)

  const order = await Order.findById(id) || await EsewaOrder.findById(id) || await CodOrder.findById(id);
  if(!order){
    return res.status(404).json({
      success: false,
       message: "No order details found in paypal!"
    })
  }
  console.log("order details in admin")
  console.log("real order detials in admin", order)
    return res.status(200).json({
      success: true,
      data: order
    })
  
  }catch(error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured",
      error: error.message 
    })
  }
}

const updateOrderStatus = async(req, res) => {
try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    console.log(id, orderStatus, "order update info")
    const order = await Order.findById(id) || await EsewaOrder.findById(id) || await CodOrder.findById(id)
    
     
    if(!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found!",
        })
    }
    await Order.findByIdAndUpdate(id, {orderStatus}) ||  await CodOrder.findByIdAndUpdate(id, {orderStatus}) ||  await EsewaOrder.findByIdAndUpdate(id, {orderStatus})
    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
    })

    
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Some error occured!",
        error: error.message,
    })
}
}

module.exports = {
    getAllOrdersofAllUser,
    getOrderDetailsForAdmin,
    updateOrderStatus,
}