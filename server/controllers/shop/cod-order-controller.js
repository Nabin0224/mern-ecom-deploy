const CodOrder = require("../../models/CodOrder");


const createCodOrder = async(req, res)=> {
    try {
        
        const formData = req.body;
        if(!formData || formData == null) {
            return res.status(401).json({
                success: false,
                message: "Form Data should be vaild and not be empty!"
            })
        }
        console.log("formData in createCodOrder", formData);

        const order = await new CodOrder(formData);

        await order.save();
        
        res.status(200).json({
            success: true,
            message: "Cod order Succcessfully created!",
            data: order
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured",
            error: error.message,
        })
    }
}

const getAllOrdersByUser = async(req, res) => {
    try {
        const userId = req.params;
        if(!userId) {
            return res.status(401).json({
                success: false,
                message: "UserId not received!"
            })
        }
        console.log("userId in getAllOrdersByUser in Cod", userId)

        const order = await CodOrder.find({userId});
        
        if(order.length == 0) {
            return res.status(404).json({
                success:false,
                message: "order not in getAllOrdersByUser!"
            })
            
        }
        console.log("All orders by user in cod", order)

        return res.status(200).json({
            success: true,
            data : order
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured",
            error: error.message
        })
    }
}

const getOrderDetails = async(req, res)=> {
    try {
        
        const {id} = req.params;

        if(!id) {
            return res.status(401).json({
                success: false,
                message: "id not received in getOrderDetails!"
            })
        }

        const order = await CodOrder.findById({id});
        if(!order) {
            return res.status(404).json({
                success: false,
                message: "No order found for details in cod!",
            })
        }

        console.log("order details in cod", order)
        
        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Some error occured",
            error: error.message
        })
    }
}

module.exports = {
    getOrderDetails,
    getAllOrdersByUser,
    createCodOrder,
}