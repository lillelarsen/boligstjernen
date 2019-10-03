const { getMessages, showMessage, deleteMessage } = require('../controllers/admin.contact.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

module.exports = function(app) {
    app.get('/admin/messages', isAuthorized, isEmployee, getMessages);
    app.get('/admin/readMessage/:id', isAuthorized, isAdmin, showMessage);

    app.get('/admin/deleteMessage/:id', isAuthorized, isAdmin, deleteMessage);
}