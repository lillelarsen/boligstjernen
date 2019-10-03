const { 
    getGlobals, 
    updateGlobals, 
    getHours,
    updateHours,
    updateHomeImg,
    deleteHomeImg 
} = require('../models/globals.model');

/**
 * @module controller/admin-main
 */

/**
 * Denne funktion retunerer main.ejs (admin) med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.main = async (req, res, next) => {
    try {
        const [rows] = await getGlobals();       
        res.render('admin/main', { 'title': 'Administrationspanel', 'content': 'Forside', 'global': rows[0]});
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente globals");
    }
}
/**
 * Denne funktion retunerer opening-hours.ejs (admin) med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showOpeningHours = async (req, res, next) => {
    try {     
        const [hourRows] = await getHours();
        res.render('admin/opening-hours', { 'title': 'Administrationspanel', 'openingHours': hourRows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente globals");
    }
}

/**
 * Denne funktion opdaterer Global data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editGlobals = async function(req, res, next) {
    if(req.fields.sitename == "") {
        req.session.flash = { 
            sitenameError:"Sidens Navn skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.sitedescription == "") {
        req.session.flash = { 
            sitedescriptionError:"Sidens beskrivelse skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.street == "") {
        req.session.flash = { 
            streetError:"Vej skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.streetNumber == "") {
        req.session.flash = { 
            streetNumberError:"Nummer skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.postalCode == "") {
        req.session.flash = { 
            postalCodeError:"Postnummer skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.city == "") {
        req.session.flash = { 
            cityError:"By skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.phone == "") {
        req.session.flash = { 
            phoneError:"Telefon skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.telefax == "") {
        req.session.flash = { 
            telefaxError:"Telefax skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    if(req.fields.email == "") {
        req.session.flash = { 
            emailError:"Email skal udfyldes",
        };
        res.redirect(req.headers.referer);
        return;
    } 
    try {
        const globals = await updateGlobals({
            id: 1, 
            name: req.fields.sitename, 
            description: req.fields.sitedescription, 
            companyName: req.fields.companyName,
            street: req.fields.street, 
            street_number: req.fields.streetNumber, 
            postal_code: req.fields.postalCode, 
            city: req.fields.city, 
            phone: req.fields.phone, 
            telefax: req.fields.telefax, 
            email: req.fields.email 
        });
        req.session.flash = { 
            success:"Indstillinger er blevet opdateret"
        };
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere Globals");
    }
}
/**
 * Denne funktion opdaterer opening hours data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editHours = async function(req, res, next) {
    if (req.fields.closed != 1) {
        if(req.fields.opens == "") {
            req.session.flash = { 
                opensError:"Åbner skal udfyldes",
            };
            res.redirect(req.headers.referer);
            return;
        } 
        if(req.fields.closing == "") {
            req.session.flash = { 
                closingError:"Lukker skal udfyldes",
            };
            res.redirect(req.headers.referer);
            return;
        } 
        req.fields.closed = 0;
    } else {
        req.fields.closed = 1;
    }
    
    try {
        const globals = await updateHours({
            id: req.fields.id, 
            opens: req.fields.opens, 
            closing: req.fields.closing, 
            closed: req.fields.closed
        });
        req.session.flash = { 
            success:"Tiden er blevet opdateret"
        };
        res.redirect('/admin/openingHours');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere Globals");
    }
}

/**
 * Denne funktion opdaterer Global data mainimage
 * @params {Object} req
 * @params {Function} res
 * @params {Function} next
 */
exports.editMainimage = async function(req, res, next) {
    if (!/image/.test(req.files.photo.type)) {
        return res.send('Den uploadede fil er ikke et billede');
    }
    try {      
        const newFileName = Date.now() + '_' + req.files.photo.name;
        const result = await updateHomeImg(req.files, req.fields,{name: newFileName, id:1}, newFileName);
        req.session.flash = { 
            success:"Billedet er blevet opdateret"
        };
        res.redirect('/admin');
    } catch (error) {
        return next(error);
    }
}

/**
 * Denne funktion sletter Global data mainimage
 * @params {Object} req
 * @params {Function} res
 * @params {Function} next
 */
exports.deleteMainimage = async function(req, res, next) {
    try {      
        const result = await deleteHomeImg(req.fields, {name: '', id:1});
        req.session.flash = { 
            success:"Billedet er blevet slettet"
        };
        res.redirect('/admin');
    } catch (error) {
        return next(error);
    }
}


