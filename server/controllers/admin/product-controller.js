const { handleImageUtils } = require("../../helpers/cloudinary");
const Product = require('../../models/products')

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await handleImageUtils(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error, error",
    });
  }
};

// add new product

const addProduct = async (req, res) => {
  try {
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        colors
      } = req.body;
    
      const newlyCreatedProduct = new Product({
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        colors,
      });

      await newlyCreatedProduct.save();
       return res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        data: newlyCreatedProduct
      })
  } catch (e) {
    console.log(e); 
    res.json({
      success: false,
      message: "Error occured ok",
    });
  }
};

// fetch all products

const fetchAllProducts = async (req, res) => {
 
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
        success: true,
        data : listOfProducts
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Error occured  ",
    });
  }
};

// edit products

const editProduct = async (req, res) => {
  try {

    const {id} =req.params
    

    const findProduct = await Product.findById(id);

    if(!findProduct) {
        return res.status(404).json({
            succes: false,
            message: "Cannot find the product"
        })

    }
    const {
      title,
      description,
      brand,
      category,
      price,
      salePrice,
      totalStock,
      image,
    } = req.body;


     findProduct.title = title || findProduct.title
     findProduct.description = description || findProduct.description
     findProduct.brand = brand || findProduct.brand
     findProduct.category = category || findProduct.category
     findProduct.price = price || findProduct.price
     findProduct.salePrice = salePrice || findProduct.salePrice
     findProduct.totalStock = totalStock || findProduct.totalStock
     findProduct.image = image || findProduct.image

     await findProduct.save();

      res.status(200).json({
        success: true,
        message: "product edited successfully",
        data: findProduct
     })

  } catch (error) {
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// delete products

const deleteProduct = async (req, res) => {
  try {

    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)

    if(!product) {
        return res.status(404).json({
            succes: false,
            message: "Cannot find the product"
        })
    }

    res.status(200).json({
        success: true,
        data: product
     })

  } catch (error) {
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  fetchAllProducts,
  addProduct,
  deleteProduct,
  editProduct
};
