
const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', ProductsController);
app.use('/sales', SalesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('ouvindo na porta 3000')); 
