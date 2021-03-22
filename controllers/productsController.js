const productsService = require('../services/productsService');

const SUCCESS = 200;
const CREATED = 201;

const getAll = async (request, response) => {
  try {
    const products = await productsService.getAll();
    return response.status(SUCCESS).json(products);
  } catch (err) {
    next(err);
  }
};

const create = async(request, response, next) => {
  try {
    const { name, quantity } = request.body;
    const product = await productsService.create(name, quantity);
    return response.status(CREATED).json(product);
  } catch (err) {
    next(err);
  }
};

const update = async (request, response, next) => {
  try {
    const { body: { name, quantity }, params: { id } } = request;
    const product = await productsService.update(id, name, quantity);
    return response.status(SUCCESS).json(product);
  } catch (err) {
    next(err);
  }
};

const findById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await productsService.findById(id);
    return response.status(SUCCESS).json(product);
  } catch (err) {
    next(err);
  }
};

const remove = async(request, response, next) => {
  try {
    const { id } = request.params;
    const product = await productsService.remove(id);
    return response.status(SUCCESS).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove
};