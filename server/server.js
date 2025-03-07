require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartProductsRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopEsewaOrderRouter = require("./routes/shop/esewa-order-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const searchRouter = require("./routes/shop/search-routes");
const commonFeatureRouter = require("./routes/common/feature");
const app = express();
const authRouter = require("./routes/auth-routes");
const PORT = process.env.PORT;

const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION)
  .then(() => console.log("MongoDb connected successfully"))
  .catch((e) => console.log("Error:", e));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api", authRouter);
app.use("/api/shop/cart", shopCartProductsRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/esewaorder", shopEsewaOrderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/search", searchRouter);
app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => {
  console.log(`Server running successfully at ${PORT}`);
});
