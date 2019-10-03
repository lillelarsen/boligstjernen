const { 
    getResidentials, 
    showResidentialForm, 
    editResidential, 
    deleteResidential, 
    showResidentialCreateForm, 
    createResidential,
    setPrimaryImage,
    residentialImageRemove 
} = require('../controllers/admin.residentials.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

module.exports = function(app) {
    app.get('/admin/createResidential', isAuthorized, isEmployee, showResidentialCreateForm);
    app.post('/admin/createResidential', isAuthorized, isEmployee, createResidential);

    app.get('/admin/residentials', isAuthorized, isEmployee, getResidentials);

    app.get('/admin/editResidential/:id', isAuthorized, isAdmin, showResidentialForm);
    app.post('/admin/editResidential/:id', isAuthorized, isAdmin, editResidential);

    app.get('/admin/deleteResidential/:id', isAuthorized, isAdmin, deleteResidential);

    app.get('/setPrimaryImage/:id', setPrimaryImage);
    app.get('/residentialImageRemove/:id', residentialImageRemove);
}