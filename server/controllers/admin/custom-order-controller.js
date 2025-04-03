const CustomOrder = require("../../models/CustomOrder");
const { findById } = require("../../models/Order");

const createOrder = async (req, res) => {
  try {
    const { formData } = req.body;
    if (!formData) {
      return res.status(404).json({
        success: false,
        message: "formData is empty or undefined!",
      });
    }

    console.log("formData in custom order creation", formData);

    const order = new CustomOrder(formData);

    await order.save();
    return res.status(200).json({
      success: true,
      message: "Custom order Successfully created!",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Some error occured in creating custom order",
      error: error.message,
    });
  }
};
const getAllCustomOrders = async (req, res) => {
  try {
    
    const order =await CustomOrder.find();

    
    return res.status(200).json({
      success: true,
      message: "Custom order Successfully fetched!",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Some error occured in fetching custom order",
      error: error.message,
    });
  }
};




const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id in req params of update custom order", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is not present",
      });
    }

    const findOrder = await CustomOrder.findById(id);
    if (!findOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

  const {
        address,
        city,
        delivery_charge,
        discount_amount,
        email,
        fullName,
        nearest_landmark,
        paymentStatus,
        phone
    } = req.body;
    const updateData = req.body.formattedData || req.body;
    
    
    for (let key in updateData) {
        if (updateData[key] !== undefined) {
          findOrder[key] = updateData[key];
        }
      }

    findOrder.address = address || findOrder.address;
    findOrder.city = city || findOrder.city;
    findOrder.delivery_charge = delivery_charge || findOrder.delivery_charge;
    findOrder.discount_amount = discount_amount || findOrder.discount_amount;
    findOrder.email = email || findOrder.email;
    findOrder.fullName = fullName || findOrder.fullName;
    findOrder.nearest_landmark = nearest_landmark || findOrder.nearest_landmark;
    findOrder.paymentStatus = paymentStatus || findOrder.paymentStatus;
    findOrder.phone = phone || findOrder.phone

    
    await findOrder.save();

    return res.status(200).json({
        success: true,
        message: "Order edited successfully",
        data: findOrder
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured in updating custom order",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Id is requried to delete order",
        })
    }

  const order =   await CustomOrder.findByIdAndDelete(id);
  if(!order) {
    return res.status(404).json({
        success: false,
        message: "Order not found!"
    })
  }

  return res.status(200).json({
    success: true,
    messaage: "Order deleted successfully",
    data: order
  })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Some error occured in deleting custom order",
      error: error.message,
    });
  }
};

const updateOrderStatus = async(req, res) => {
  try {
    const { id } = req.params;
  const { status } = req.body;
 console.log("params and rbody", req.params, req.bd)
  if(!id || ! status) {
    return res.status(400).json({
      success: false,
      message: "Id or status not present!",
    })
  }

  const updatedOrder = await CustomOrder.findByIdAndUpdate(
id,
{ orderStatus : status},
{ new: true},
  )

  if(!updateOrder) {
    return res.status(404).json({
      success: false,
      message: "Order not found!",
     
    })
  }


  return res.status(200).json({
    success: true,
    message: "OrderStatus updated successfully",
    data: updateOrder
  })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
      errro: error.message,
    })
  }
}


module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllCustomOrders,
  updateOrderStatus
};
