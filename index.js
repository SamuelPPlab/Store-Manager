const express = require('express');
const bodyParser = require('body-parser');

const productRouter = require('./src/controllers/productController');
const saleRouter = require('./src/controllers/saleController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use('/sales', saleRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
