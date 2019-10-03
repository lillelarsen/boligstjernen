const { getHours } = require('../models/globals.model');
const { createMessage } = require('../models/contact.model');
const moment = require('moment');
moment.locale('da');
/**
 * @module controller/site-contact
 */

/**
 * Denne funktion retunerer contact.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showContactForm = async function(req, res, next) {
    try {
        const [rows, fields] = await getHours()
        res.render('client/contact', { 'title': 'Kontakt', 'hours': rows, moment });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke indlæse siden");
    }
}

/**
 * Denne funktion poster signup med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.sendContactForm = async function(req, res, next) {  

        if(req.fields.name == "") {
            req.session.flash = { 
                nameError:"Navn skal udfyldes",
                email: req.fields.email,
                name: req.fields.name,
                message: req.fields.message  
            };
            res.redirect("/kontakt");
            return;
        } 
        if(req.fields.email == "") {
            req.session.flash = { 
                emailError:"Email skal udfyldes",
                email: req.fields.email,
                name: req.fields.name,
                message: req.fields.message  
            };
            res.redirect("/kontakt");
            return;
        } 
        
        if(req.fields.message == "") {
            req.session.flash = { 
                messageError:"Kommentar skal udfyldes",
                email: req.fields.email,
                name: req.fields.name,
                message: req.fields.message  
            };
            res.redirect("/kontakt");
            return;
        }


    try {
        const user = await createMessage({
            name: req.fields.name,
            adress: req.fields.adress,
            phone: req.fields.phone,
            email: req.fields.email,
            message: req.fields.message,
        });
        req.session.flash = { 
            success:"afsendt"
        };
        res.redirect("/kontakt");
        return;
        // res.render('client/contact', { 'title': 'Kontakt' });
    } catch (error) {
        console.log(error);
        res.send("fejl");
    }
 };

