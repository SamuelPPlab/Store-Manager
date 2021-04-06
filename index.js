const express = require('express');
const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');


const PORT = 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsController);
app.use('/sales', SalesController);

app.listen(PORT);
