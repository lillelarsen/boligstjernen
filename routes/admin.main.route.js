const { main, editGlobals, editMainimage, deleteMainimage, editHours, showOpeningHours } = require('../controllers/admin.main.controller.js');
const isAuthorized = require("../middleware/is-authenticated");
const isEmployee = require('../middleware/is-employee');
const isAdmin = require('../middleware/is-admin');

module.exports = function(app) {
        app.get('/admin', isAuthorized, isAdmin, main);
        app.post('/admin', isAuthorized, isAdmin, editGlobals);
      
        app.get('/admin/openingHours', isAuthorized, isAdmin, showOpeningHours);
        app.post('/admin/openingHours', isAuthorized, isAdmin, editHours);

        app.patch('/admin/mainimage', editMainimage);
        app.get('/admin/mainimage', deleteMainimage);
}