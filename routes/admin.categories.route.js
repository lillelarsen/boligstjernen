const { showCategoryCreateForm, getCategories, showCategoryForm, editCategory, deleteCategory, createCategory } = require('../controllers/admin.categories.controller');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

 module.exports = function(app) {
    app.get('/admin/createCategory', isAuthorized, isEmployee, showCategoryCreateForm);
    app.post('/admin/createCategory', isAuthorized, isEmployee, createCategory);

    app.get('/admin/categories', isAuthorized, isEmployee, getCategories);

    app.get('/admin/editCategory/:id', isAuthorized, isAdmin, showCategoryForm);
    app.post('/admin/editCategory/:id', isAuthorized, isAdmin, editCategory);
    
    app.get('/admin/deleteCategory/:id', isAuthorized, isAdmin, deleteCategory);
 }