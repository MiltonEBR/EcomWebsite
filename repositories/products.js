const Repository = require('./repository');

class ProducstRepository extends Repository {}

module.exports = new ProducstRepository('products.json');
