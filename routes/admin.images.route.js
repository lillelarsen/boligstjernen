const { showUploadForm, uploadImage, showImages, editFormImage, editImage, deleteImage } = require('../controllers/admin.images.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

module.exports = function(app) {
    app.get('/admin/upload', isAuthorized, isEmployee, showUploadForm);
    app.post('/admin/upload', isAuthorized, isEmployee, uploadImage);

    app.get('/admin/images', isAuthorized, isEmployee, showImages);

    app.get('/admin/images/:id', isAuthorized, isEmployee, editFormImage);
    app.post('/admin/images/:id', isAuthorized, isEmployee, editImage);

    app.get('/admin/images/:id', isAuthorized, isEmployee, deleteImage);
}