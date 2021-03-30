const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');
const saleController = require('./controller/saleController');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', productController);
app.use('/sales', saleController);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
