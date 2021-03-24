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
  const productById = await ProductModel.findProductById(id);

  return productById;
};

// Atualizar produtos por ID
const updateProduct = async (id, name, quantity) => {
  const updateProduct = await ProductModel.createProduct(id, name, quantity);

  return updateProduct;
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
