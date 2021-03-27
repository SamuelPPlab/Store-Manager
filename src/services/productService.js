const { ObjectId } = require('mongodb');
const { getAll } = require('../models/productModels');

const validNameLength = 5;
const zero = 0;
const UNPROCESSABLE_ENTITY = 422;

async function setValidation (req, res, next) {
  const { name, quantity } = req.body;

  if (name.length < validNameLength) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long'
        },
      }
    );
  }

  if (typeof name !== 'string') {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err: {
          code: 'invalid_data',
          message: '"name" must be a string'
        },
      }
    );
  }

  if (!Number.isInteger(quantity)) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        },
      }
    );
  }

  if (quantity <= zero) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1'
        },
      }
    );
  }
  next();
};

async function setValidationID (req, res, next) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(UNPROCESSABLE_ENTITY).json(
    {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    }
  );
  next();
};

async function ifExist (req, res, next) {
  const { name } = req.body;
  const products = await getAll();
  const findProduct = await products.find((product) => product.name === name);

  if (findProduct) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        err: {
          code: 'invalid_data',
          message: 'Product already exists'
        },
      }
    );
  }
  next();
};

module.exports = {
  ifExist,
  setValidation,
  setValidationID,
};
