const { 
    getCategories, 
    createCategory,
    updateCategory,
    deleteCategory,
    showCategoryEditForm 
} = require('../models/categories.model');
const { refererRedirect } = require('../helpers/redirect.helper.js');
/**
 * @module controller/admin-categories
 */

 /**
 * Denne funktion retunerer create-category.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showCategoryCreateForm = async function(req, res, next) {
    try {
        res.render('admin/create-category', { 'title': 'Opret boligtype', 'content': 'Opret boligtype i formen'});
    } catch (error) {
        console.log(error);
        res.send("Kan ikke indlæse siden");
    }
}

/**
 * Denne funktion opretter med POST en category
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.createCategory = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            description: req.fields.description       
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.description == "") {
        req.session.flash = { 
            descriptionError:"beskrivelse skal udfyldes",
            name: req.fields.name,
            description: req.fields.description       
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {
        const category = await createCategory({
            name: req.fields.name, 
            description: req.fields.description
        });
        req.session.flash = { 
            success:"Kategorien er oprettet"
        };
        res.redirect('/admin/categories');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke oprette boligtype");
    }
}

/**
 * Denne funktion retunerer categories.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getCategories = async function(req, res, next) {
    try {
        const [rows] = await getCategories();
        res.render('admin/categories', { 'title': 'Boligtyper', 'content': 'en liste over boligtyper', 'categories': rows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente boligtype");
    }
}

/**
 * Denne funktion retunerer edit-category.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showCategoryForm = async function(req, res, next) {
    try {
        const [rows] = await showCategoryEditForm(req.params.id);
        res.render('admin/edit-category', { 'title': 'Redigér', 'content': 'Redigér boligtypen', 'category': rows[0] });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde boligtype");
    }
}

/**
 * Denne funktion opdaterer category data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editCategory = async function(req, res, next) {
    if(req.fields.name == "") {
        req.session.flash = { 
            nameError:"Navn skal udfyldes",
            name: req.fields.name,
            description: req.fields.description       
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.description == "") {
        req.session.flash = { 
            descriptionError:"beskrivelse skal udfyldes",
            name: req.fields.name,
            description: req.fields.description       
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {
        const user = await updateCategory({
            id: req.params.id, 
            name: req.fields.name, 
            description: req.fields.description
        });
        req.session.flash = { 
            success:"Kategorien er opdateret"
        };
        res.redirect('/admin/editCategory/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere boligtype");
    }
}

/**
 * Denne funktion sletter category data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteCategory = async function(req, res, next) {
    try {
        await deleteCategory(req.params.id);
        req.session.flash = { 
            success:"Kategorien er slettet"
        };
        res.redirect('/admin/categories');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette boligtype");
    }
}