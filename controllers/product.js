const express = require('express');
const routers = express.Router();

const { bar } = require('../middleware/productsBar');

routers.post('/', bar );

module.exports = routers;