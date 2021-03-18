const express = require('express');
const productsRoutes = require('./productsRoutes');
const salesRoutes = require('./salesRoutes');
const middlewares = require('../middlewares');

const routes = express.Router();

routes.use('/products', productsRoutes);
routes.use('/sales', salesRoutes);

routes.use(middlewares.handleError);

module.exports = routes;
