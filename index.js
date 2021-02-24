const express = require('express');
const productsController = require('./src/controllers/produtosControllers');
const salesController = require('./src/controllers/vendasControllers');

const app = express();
const port = 3003;


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

