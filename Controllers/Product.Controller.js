const mongoose = require('mongoose');
const createError = require('http-errors');

const Product = require('../Models/Product.model');

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const results = await Product.find({}, { __v: 0 });
      res.send(results)
    } catch (error) {
      console.log(error.message);
    }
  },

  findProductById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw createError(404, 'Product does not exist')
      }
      res.send(product)   
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid product id"));
        return;
      }
      next(error);
    }
  },

  createNewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
        const { name, quantity } = product;
        if (name.length < 6) {
          throw createError(422, '"name" length must be at least 5 characters long')
        }
        if (quantity < 1) {
          throw createError(422, '"quantity" must be larger than or equal to 1')
        }
        const result = await product.save();
        res.status(201)
        res.send(result)
      } catch (error) {
      console.log(error.message);
      }
      next(error);
    },

  updateProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body
      const options = { new: true };
  
      const result = await Product.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "product does not exist");
      }
      res.send(result);
    
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "invalid product id"));
      }
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Product does not exist')
      }
      res.send(result)  
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid product id"));
        return;
      }
      next(error);
    }
  }
};