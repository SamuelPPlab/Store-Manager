const express = require('express');
const bodyParser = require('body-parser');
const ProductsController = require('./controller/productsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.use('/products', ProductsController);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
