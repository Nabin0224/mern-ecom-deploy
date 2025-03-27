const mongoose =  require("mongoose");

const CodOrderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
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
            image: [],
            price: Number,
            quantity: Number,
        }
    ],
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: String,
    orderDate: String
})

module.exports = mongoose.model("CodOrder", CodOrderSchema);
