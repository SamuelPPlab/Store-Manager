const express = require('express');
const routers = express.Router();

const { bar } = require('../middleware/productsBar');

routers.post('/', bar );
// routers.get('/',);

module.exports = routers;