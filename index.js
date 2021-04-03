const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/products', productController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.listen(PORT, () => console.log('ouvindo na porta 3000')); 
