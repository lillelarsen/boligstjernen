const { showContactForm, sendContactForm } = require('../controllers/site.contact.controller.js');

module.exports = function(app) {
        app.get('/kontakt', showContactForm);
        app.post('/kontakt', sendContactForm);
}