const { showRoleCreateForm, getRoles, showRoleForm, editRole, deleteRole, createRole } = require('../controllers/admin.roles.controller');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

 module.exports = function(app) {
    app.get('/admin/createRole', isAuthorized, isEmployee, showRoleCreateForm);
    app.post('/admin/createRole', isAuthorized, isEmployee, createRole);

    app.get('/admin/roles', isAuthorized, isEmployee, getRoles);

    app.get('/admin/editRole/:id', isAuthorized, isAdmin, showRoleForm);
    app.post('/admin/editRole/:id', isAuthorized, isAdmin, editRole);

    app.get('/admin/deleteRole/:id', isAuthorized, isAdmin, deleteRole);
 }