const productsServices = require('../../services/productsServices');

const UNPROCESSABLE_ENTITY = 422;

const nameExist = async (req, res, next) => {
  const { name } = req.body;
  const foundName = await productsServices.findProductByName(name);
  if (foundName) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

module.exports = nameExist;
