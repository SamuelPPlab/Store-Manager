const express = require('express');
const bodyParse = require('body-parser');
const routes = require('./routes');

const port = 3000;

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParse.json());

app.use(routes);

app.listen(port, () => console.log(`A porta usada vai ser a ${port}`));