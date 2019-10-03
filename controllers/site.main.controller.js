const { getCategories } = require('../models/categories.model');
/**
 * @module controller/site-home
 */

/**
 * Denne funktion retunerer main.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.main = async (req, res, next) => {
    try {    
        const [categoryRows] = await getCategories();
        res.render('client/main', { 'title': 'Forside','categories': categoryRows });
    } catch (error) {
        console.log(error);
        res.send("Noget gik galt");
    }
}