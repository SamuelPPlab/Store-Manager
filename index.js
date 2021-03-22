const express = require('express');

const productsController = require('./controllers/ProductsController');
const salesController = require('./controllers/SalesController');

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const FAIL = 500;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);
app.use((err, _req, res, _next) => {
  res.status(FAIL).json({ message: err.message });
});
