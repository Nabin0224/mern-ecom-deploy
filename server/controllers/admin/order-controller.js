const  Order  = require('../../models/Order')
const EsewaOrder = require('../../models/EsewaOrder')

const getAllOrdersofAllUser = async(req, res)=> {
try {
  
  const paypalorders = await Order.find({})
  const esewaorders = await EsewaOrder.find({});  // returns array of orders present in the database 

  if(paypalorders.length === 0 ) {
    return res.status(404).json({
      success: false,
      message: "No paypal orders found!"
    })
  }
  if(esewaorders.length === 0 ) {
    return res.status(404).json({
      success: false,
      message: "No esewa orders found!"
    })
  }

  const orders = [...paypalorders, ...esewaorders]
  res.status(200).json({
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

  const order = await Order.findById(id)
  if(!order){
    return res.status(404).json({
      success: false,
       message: "No order found!"
    })
  }
  console.log(order, "order details")
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
    const order = await Order.findById(id);
    
     
    if(!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found!",
        })
    }
    await Order.findByIdAndUpdate(id, {orderStatus})
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