const { main } = require('../controllers/site.main.controller.js');

module.exports = function(app) {
        app.get('/', main);
}