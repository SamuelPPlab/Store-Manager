const { HelloWorldService } = require('../services/index');

class ProductsController {
  create(req, res) {}

  list(req, res) {
    const helloWorldService = new HelloWorldService();
    const message = helloWorldService.execute();
    return res.json({ message });
  }

  update(req, res) {}

  delete(req, res) {}
}

module.exports = ProductsController;
