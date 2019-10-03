const { 
    getArticles, 
    showArticleForm, 
    editArticle, 
    deleteArticle, 
    showArticleCreateForm, 
    createArticle
} = require('../controllers/admin.articles.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

module.exports = function(app) {
    app.get('/admin/createArticle', isAuthorized, isEmployee, showArticleCreateForm);
    app.post('/admin/createArticle', isAuthorized, isEmployee, createArticle);

    app.get('/admin/articles', isAuthorized, isEmployee, getArticles);

    app.get('/admin/editArticle/:id', isAuthorized, isAdmin, showArticleForm);
    app.post('/admin/editArticle/:id', isAuthorized, isAdmin, editArticle);
    
    app.get('/admin/deleteArticle/:id', isAuthorized, isAdmin, deleteArticle);
}