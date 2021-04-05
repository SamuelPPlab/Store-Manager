const { ObjectId } = require('mongodb');
const ProductsService = require('../services/ProductsService');
const UNPROCESSABLE_ENTITY = 422;

const validateId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(id);
    
    if (!ObjectId.isValid(id)) {
      return res.status(UNPROCESSABLE_ENTITY)
        .json({err: { 
          code: 'invalid_data',  
          message: 'Wrong id format' 
        } });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = {
  validateId,
};
