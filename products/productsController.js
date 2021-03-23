const productsService = require('./productsService');

const OK = 200;
const ERROR = 422;
const NOT_FOUND = 404;
const ZERO = 0;

const createProduct = async (req, res) => {
  console.log('controller - products');
  const { name, quantity } = req.body;
  console.log(name, quantity);

  const { CREATED, createdProduct, err } = await
  productsService.createProduct(name, quantity);

  console.log('code NO CONTROLLER', CREATED);
  console.log('insertedProductInfos NO CONTROLLER', createdProduct);
  console.log('err NO CONTROLLER', err);

  if (err) return res.status(ERROR).json({err});

  res.status(CREATED).json(createdProduct);
};

const getAll = async (req, res) => {
  const productsResponse = await productsService.getAll();
  console.log('getAll - controller', productsResponse);

  if(productsResponse.length === ZERO)
    return res.status(NOT_FOUND).json({ message: 'Not found' });

  res.status(OK).json({products: productsResponse});
};

const findById = async (req, res) => {
  const { id } = req.params;
  console.log('ID', id);

  const { productById, err } = await productsService.findById(id);

  if (err) return res.status(ERROR).json({err});

  res.status(OK).json(productById);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { UPDATED, updatedProduct, err } =
    await productsService.updateProduct(id, name, quantity);

  if (err) return res.status(ERROR).json({err});

  res.status(UPDATED).json(updatedProduct);
};

module.exports = {
  createProduct,
  getAll,
  findById,
  updateProduct,
};
