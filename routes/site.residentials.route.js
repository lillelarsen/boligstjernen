const { 
    searchProducts, 
    showProduct
} = require('../controllers/site.residentials.controller.js');

module.exports = function(app) {
    app.get('/boliger', searchProducts);
    app.get('/bolig/:id', showProduct);
}