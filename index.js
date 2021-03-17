const express = require('express');
const port = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', )

app.listen(port, () => console.log(`A porta usada vai ser a ${port}`));