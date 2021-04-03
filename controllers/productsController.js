const { Router } = require('express');
const {
  createProduct,
  findProductById,
  getProducts,
  updateProduct,
  deleteProduct } = require('../services/productsServices');
const validateNewProduct = require('../middlewares/validateNewProduct');
const validateDuplicateProduct = require('../middlewares/validateDuplicateProduct');

const router = Router();

const SUCCESS = 200;
const CREATED = 201;
const DFT_ERROR = 400;
const UNPROCESSABLE = 422;

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await findProductById(id);

    if (findProduct === false) return res.status(UNPROCESSABLE).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });

    res.status(SUCCESS).send(findProduct);
  } catch(e) {
    console.log(e);
  }
});

router.get('/', async (_req, res) => {
  try {
    const products = await getProducts();

    res.status(SUCCESS).send({ products });
  } catch(e) {
    res.status(DFT_ERROR).send({
      err: 'invalid_data',
      message: 'Something went awry.'
    });
  }
});

router.post('/', validateNewProduct, validateDuplicateProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await createProduct({ name, quantity });

    return res.status(CREATED).send(newProduct);
  } catch(e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.put('/:id', validateNewProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const updatedProduct = await updateProduct({ name, quantity, id });

    return res.status(SUCCESS).send(updatedProduct);
  } catch(e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await findProductById(id);

    if (findProduct === false) return res.status(UNPROCESSABLE).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    });
    await deleteProduct(id);
    res.status(SUCCESS).send(findProduct);
  } catch(e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

module.exports = router;
