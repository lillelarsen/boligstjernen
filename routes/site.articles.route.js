const { showArticlesList } = require('../controllers/site.articles.controller.js');

module.exports = function(app) {
    app.get('/nyheder', showArticlesList);
}