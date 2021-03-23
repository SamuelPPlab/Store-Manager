const { findProductbyName } = require('../services/productsServices');

const UNPROCESSABLE_ENTITY = 422;
const NUMBER_MIN_LENGTH = 5;

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const foundName = await findProductbyName(name);
  if (name.length < NUMBER_MIN_LENGTH) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message: 'name length must be at least 5 characters long' });
  }
  if (foundName) {
    return res
      .status(UNPROCESSABLE_ENTITY)
      .json({ message: 'Product already exists' });
  }
  next();
};

module.exports = validateName;
