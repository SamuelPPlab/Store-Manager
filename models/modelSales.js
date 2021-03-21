const connection = require('./connection');

const insertSales = async (sales) => {
  return await connection()
    .then((db) => db.collection('sales').insert({ itensSold: sales }));
};

module.exports = {
  insertSales,
};

