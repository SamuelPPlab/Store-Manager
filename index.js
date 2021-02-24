const express = require('express');
const bodyParser = require('body-parser');
const ProductController = require('./src/controller/ProductController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductController);

app.listen(PORT, () => console.log('App listening on PORT %s', PORT));