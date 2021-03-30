const { Router } = require('express');

const {
  validateQuantity,
} = require('../service/productService');

const Sales = new Router();

Product.post('/', validateQuantity, async (req, res) => {

});

module.exports = { Sales };
