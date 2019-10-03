const { showArticles } = require('../models/articles.model');
const moment = require('moment');
moment.locale('da');
/**
 * @module controller/site-articles
 */

/**
 * Denne funktion viser nyheder på news.ejs 
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showArticlesList = async function(req, res, next) {    
    try {        
        const [rows] = await showArticles();
        res.render('client/news', { 
            'title': 'Nyheder', 
            'content': 'en liste over nyheder', 
            'articles': rows,
            moment
        });

    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde resultater");
    }
    
}