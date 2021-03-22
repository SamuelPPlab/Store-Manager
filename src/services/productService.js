const ProductModel = require('../models/productModel');
const { status, errors, codeStatus } = require('../schemas/status');

// Criação do produto
const createProduct = async (name, quantity) => {
  const isDuplicate = await ProductModel.findProductByName(name);

  if (isDuplicate) { 
    return { 
      isError: true,
      status: status.unprocessableEntity,
      code: codeStatus.invalidData,
      message: errors.productExists
    };
  };

  const createdProduct = await ProductModel.createProduct(name, quantity);

  return createdProduct;
};

// Lista todos os produtos
const getAllProducts = async () => {
  const products = await ProductModel.getAllProducts();

  const allProducts = { products };

  return allProducts;
};

// Lista produtos por ID
const findProductById = async (id) => {
  const onlyOneProduct = await ProductModel.findProductById(id);

  return onlyOneProduct;
};

// Atualizar produtos por ID
const updateProduct = async (id, name, quantity) => {
  await ProductModel.createProduct(id, name, quantity);

  const resultUpdateProduct = {
    _id: id,
    name,
    quantity,
  };

  return resultUpdateProduct;
};

// Remover produto
const deleteProduct = async (id) => {
  const deleteProduct = await ProductModel.deleteProduct(id);

  return deleteProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
