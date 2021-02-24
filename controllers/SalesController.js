const { Router } = require('express');
const SaleService = require('../services/SalesService');

const SalesControllerRouter = Router();
const SC_OK = 200;
const CREATED = 201;
const SC_NO_CONTENT = 204;
const SC_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const NAME_MIN_LENGHT = 5;
const ZERO = 0;

const validate = async (req, res) => {

  const { productId, quantity } = req.body[0];
  let message;
  let code;
  let status_code;
  let object_answer;
  if (!productId) {
    message = 'Inform a value for "name"';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  
  if (typeof productId !== 'string') {
    message = '"name" is not a string';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  if (productId.length < NAME_MIN_LENGHT) {
    message = '"name" length must be at least 5 characters long';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }

  if (quantity === undefined) {
    message = '"quantity" do not exist';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(UNPROCESSABLE_ENTITY).json(object_answer);
    return false;
  }
  if (quantity <= ZERO) {
    message = 'Wrong product ID or invalid quantity';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  if (typeof quantity === 'string') {
    message = 'Wrong product ID or invalid quantity';
    code = 'invalid_data';
    status_code = UNPROCESSABLE_ENTITY;
    object_answer = {
      err: {
        code,
        message,
      }
    };
    res.status(status_code).json(object_answer);
    return false;
  }
  return true;
};

SalesControllerRouter.get('/', async (_req, res) => {
  const sales = await SaleService.getAll();
  res.status(SC_OK).json(sales);
});


SalesControllerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sales = await SaleService.findById(id);

  if (!sales ) {
    const errorMessage = {
      code: 'not_found',
      message: 'Sale not found',
    };
    return res.status(SC_NOT_FOUND).json({err: errorMessage});
  }

  res.status(SC_OK).json(sales);
});

SalesControllerRouter.post('/', async (req, res) => {
  console.log('primeiro: conntroller');
  const isValid = await validate(req,res);
  if (isValid) {
    const array = req.body;
    const sales = await SaleService.create(array);
    res.status(SC_OK).json(sales);
  }
});

SalesControllerRouter.put('/:id', async (req, res) => {
  const isValid = await validate(req,res);
  if (isValid) {
    const { id } = req.params;  
    const sales = await SaleService.update(id, req.body);
    res.status(SC_OK).json(sales);
  }
});

SalesControllerRouter.delete('/:id', async(req, res) => {
  const { id } = req.params;
  console.log(id);
  const sales = await SaleService.remove(id);

  if (!sales ) {
    const errorMessage = {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
    return res.status(UNPROCESSABLE_ENTITY).json({err: errorMessage});
  }

  res.status(SC_OK).json(sales);
});

module.exports = SalesControllerRouter;
