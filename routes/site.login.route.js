const { getLoginForm, loginCheck, logout } = require('../controllers/site.login.controller.js');

module.exports = function(app) {
    app.get('/login', getLoginForm );
    app.post('/login', loginCheck );

    app.get('/logout', logout );

}