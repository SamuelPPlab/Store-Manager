const ZERO = 0;

module.exports = async (sale) => {
  await sale.forEach(item => {
    const { quantity } = item;

    if(quantity <= ZERO || typeof quantity !== 'number') throw({
      err: {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    });
  });
};