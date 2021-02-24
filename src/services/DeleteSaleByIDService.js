const AppError = require('../errors/AppError');
const { INVALID_DATA } = require('../errors/codes');
const { BAD_DATA, NOT_FOUND } = require('../errors/status');

class DeleteSaleByIDService {
  constructor(SalesModel) {
    this.SalesModel = SalesModel;
  }

  async execute(id) {
    let saleInfo;

    try {
      saleInfo = await this.SalesModel.findByID(id);
    } catch (err) {
      const message = 'Wrong id format';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, BAD_DATA);
    }

    if (!saleInfo) {
      const message = 'Product not found';

      const errorInfo = {
        message,
        code: INVALID_DATA
      };

      throw new AppError(errorInfo, NOT_FOUND);
    }

    await this.SalesModel.deleteByID(id);

    return saleInfo;
  }
}

module.exports = DeleteSaleByIDService;
