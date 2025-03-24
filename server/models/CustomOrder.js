const mongoose = require('mongoose');

const CustomOrderSchema = new mongoose.Schema({
    userId: String,
    
    addressInfo: {
        fullName: String,
        addressId: String,
        address: String,
        city: String,
        nearest_landmark : String,
        phone: String,
    },
    cartItem: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number,
            color: String
        }
    ],
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: String,
    orderDate: {
        type: Date
    },
},
{timestamps: true})

module.exports = mongoose.model("CustomOrder", CustomOrderSchema);