const { 
    searchResidential, 
    getOneResidential 
} = require('../models/residentials.model');
const { getCategories } = require('../models/categories.model');
const { showImageByResidentialId } = require('../models/images.model');
/**
 * @module controller/site-residentials
 */

 /**
 * Denne funktion retunerer products.ejs med data/søgeværdier
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.searchProducts = async function(req, res, next) {    
    try {       
        const result = await searchResidential(req.query);
        const [categoryRows] = await getCategories();
        
        res.render('client/products', { 
            'title': 'Søg bolig', 
            'content': 'Her kan du søge i vores store boligoversigt. Du kan vælge at søge direkte på et sagsnummer, eller vælge at udfylde dine søgekriterier i formularen - måske har vi netop nu din drømmebolig til salg.', 
            'products': result.rows,
            'categories': categoryRows,
            'total_pages': result.total_pages,
            'current_page': result.current_page,
            'itemsPerPage': result.limit,
            'page_number': result.values.page,
            'values': result.values,
            'minimumprice': result.values.minimumprice,
            'maximumprice': result.values.maximumprice,
            'category': result.values.category,

        });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde resultater");
    }
}

/**
 * Denne funktion retunerer product.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showProduct = async function(req, res, next) {
    try {
        const [productRows] = await getOneResidential(req.params.id);
        const [imageRows] = await showImageByResidentialId(req.params.id);
        res.render('client/product', { 'title': 'Møbler', 'name': productRows[0].title, 'product': productRows[0], 'images': imageRows });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde bruger");
    }
}

