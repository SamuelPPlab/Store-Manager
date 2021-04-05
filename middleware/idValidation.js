const { ObjectId } = require('mongodb');
const productsServices = require('../services/productsServices');

const UNPROCESSABLE_ENTITY = 422;

const validateId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundId = await productsServices.findProductsById(id);

    if (!foundId) {
      return res.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
  } catch (error) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  next();
};

module.exports = validateId;
