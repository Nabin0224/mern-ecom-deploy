const CustomerOrder = require("../../models/CustomOrder");

const createOrder = async(req, res) => {
try {
    const formData  = req.body;
    if(!formData) {
        return res.status(404).json({
            success: false,
            message: "formData is empty or undefined!",
        })
    }

    console.log("formData in custom order creation", formData)

    const order = new CustomerOrder(formData);
    
    await order.save();
    return res.status(200).json({
        success: true,
        message: "Custom order Successfully created!",
        data: order
    })
    
} catch (error) {
    
    res.status(400).json({
        success: false,
        message: "Some error occured in creating custom order",
        error: error.message,
    })
}
}
const updateOrder = async(req, res) => {
try {
    
} catch (error) {
    
    res.status(400).json({
        success: false,
        message: "Some error occured in updating custom order",
        error: error.message,
    })
}
}
const deleteOrder = async(req, res) => {
try {
    
} catch (error) {
    
    res.status(400).json({
        success: false,
        message: "Some error occured in deleting custom order",
        error: error.message,
    })
}
}



module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
}