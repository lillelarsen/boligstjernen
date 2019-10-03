const { 
    deleteResidential, 
    updateResidential, 
    createResidential, 
    countResidentials, 
    getResidentials,
    getOneResidential 
} = require('../models/residentials.model');
const { getCategories } = require('../models/categories.model');
const { setPrimaryImage, 
    unsetPrimaryImage, 
    residentialImageRemove, 
    getImages, 
    setImageToResidential,
    getImagesFromResidential 
} = require('../models/images.model');
const { refererRedirect } = require('../helpers/redirect.helper.js');
/**
 * @module controller/admin-residentials
 */

 /**
 * Denne funktion retunerer create-residential.ejs
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showResidentialCreateForm = async function(req, res, next) {
    try {
        const [images] = await getImages();
        const [rows, fields] = await getCategories(); 
        const product = {
            productId: undefined
        }
        res.render('admin/create-residential', { 'images': images, 'title': 'Opret bolig', 'content': 'Opret bolig i formen', 'categories': rows, 'product': product });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke indlæse siden");
    }
}

/**
 * Denne funktion opretter med POST et Residential
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.createResidential = async function(req, res, next) {
    if(req.fields.title == "") {
        req.session.flash = { 
            titleError:"Titel skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.description == "") {
        req.session.flash = { 
            descriptionError:"Beskrivelse skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.caseNumber == "") {
        req.session.flash = { 
            caseNumberError:"Sagsnr. skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.rentGross == "") {
        req.session.flash = { 
            rentGrossError:"Brutto husleje skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.price == "") {
        req.session.flash = { 
            priceError:"Pris skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea     
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.rentNet == "") {
        req.session.flash = { 
            rentNetError:"Netto husleje skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea   
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.residentialSize == "") {
        req.session.flash = { 
            residentialSizeError:"Boligstørrelse skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea     
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.groundArea == "") {
        req.session.flash = { 
            groundAreaError:"Grundareal skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea     
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {  
        const rows = await createResidential({
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea, 
            category: req.fields.category
        });
        if(Object.prototype.toString.call(req.fields.chooseImage) == "[object Array]") {
            req.fields.chooseImage.forEach(async element => {              
                const [imageRows] = await setImageToResidential({ 
                    id: element, 
                    product: rows[0].insertId 
                });
            });
        } else if (req.fields.chooseImage != undefined) {
            const [imageRows] = await setImageToResidential({ 
                id: req.fields.chooseImage, 
                product: rows[0].insertId 
            });
        }
        req.session.flash = { 
            success:"Boligen er blevet oprettet"
        };
        res.redirect('/admin/residentials');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke oprette bolig");
    }
}

/**
 * Denne funktion retunerer residentials.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.getResidentials = async function(req, res, next) {
    let values = req.query;
       
    // bestem hvor mange elementer der skal vises pr side
    let limit = Number(values.items) || 10;
    // vi går som standard ud fra at det er den første side der skal vises
    let current_page = 1;
    // tjek at page findes i querystring og at det er et tal
    if (values.page != undefined) {
        if (parseInt(values.page) < 1) {
            res.redirect('/admin/residentials');
            return;
        }
        if (parseInt(values.page) >= 1) {
            current_page = parseInt(values.page);
        }
    }
    // find ud af hvor mange boliger der er i databasen
    let [result] = await countResidentials();
    let total_items = result[0].total_items;

    // beregn hvor mange boliger der skal springes over 
    // for at vise den pågældende side
    let offset = (current_page - 1) * limit;

    // beregn hvor mange sider der er i alt, 
    // baseret på antal elementer og elementer pr side
    let total_pages = Math.ceil(total_items / limit);

    // hvis "offset" er større end totalle antal items, så indlæses den sidste side
    if (offset > total_items) {
        res.redirect(`/admin/residentials?page=${total_pages}&items=${limit}`);
        return;
    }
    try {
        const [rows, fields] = await getResidentials({
            productlimit: limit, 
            productoffset: offset
        });

        res.render('admin/residentials', { 
            'title': 'Boliger', 
            'content': 'en liste over boliger', 
            'products': rows,
            'total_pages': total_pages,
            'current_page': current_page,
            'itemsPerPage': limit
        });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke hente boliger");
    }
}

/**
 * Denne funktion retunerer edit-residential.ejs med data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.showResidentialForm = async function(req, res, next) {
    try {
        const [productRows] = await getOneResidential(req.params.id);
        const [images] = await getImages();
        const [selected] = await getImagesFromResidential(req.params.id);
        const [categoryRows] = await getCategories();
        res.render('admin/edit-residential', { 'images': images, 'title': 'Redigér', 'content': 'Redigér kategorien', 'product': productRows[0], 'categories': categoryRows, 'selected' : selected  });
    } catch (error) {
        console.log(error);
        res.send("Kan ikke finde bolig");
    }
}

/**
 * Denne funktion opdaterer residential data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.editResidential = async function(req, res, next) {
    if(req.fields.title == "") {
        req.session.flash = { 
            titleError:"Titel skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.description == "") {
        req.session.flash = { 
            descriptionError:"Beskrivelse skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.caseNumber == "") {
        req.session.flash = { 
            caseNumberError:"Sagsnr. skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.rentGross == "") {
        req.session.flash = { 
            rentGrossError:"Brutto husleje skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea  
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.price == "") {
        req.session.flash = { 
            priceError:"Pris skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea     
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.rentNet == "") {
        req.session.flash = { 
            rentNetError:"Netto husleje skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea   
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.residentialSize == "") {
        req.session.flash = { 
            residentialSizeError:"Boligstørrelse skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea     
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    if(req.fields.groundArea == "") {
        req.session.flash = { 
            groundAreaError:"Grundareal skal udfyldes",
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea     
        };
        res.redirect(refererRedirect(req.headers.referer));
        return;
    } 
    try {
        const productUpdate = await updateResidential({
            id: req.params.id, 
            title: req.fields.title,
            description: req.fields.description,
            caseNumber: req.fields.caseNumber,
            rentGross: req.fields.rentGross,
            price: req.fields.price,
            rentNet: req.fields.rentNet,
            residentialSize: req.fields.residentialSize,
            groundArea: req.fields.groundArea,
            category: req.fields.category
        });
        
        if(Object.prototype.toString.call(req.fields.chooseImage) == "[object Array]") {
            req.fields.chooseImage.forEach(async element => {
                const [imageRows] = await setImageToResidential({ 
                    id: element, 
                    product: req.params.id 
                });
            });
        } else if (req.fields.chooseImage != undefined) {
            const [imageRows] = await setImageToResidential({ 
                id: req.fields.chooseImage, 
                product: req.params.id 
            });
        }
        req.session.flash = { 
            success:"Boligen er blevet opdateret"
        };
        res.redirect('/admin/editResidential/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send("Kan ikke opdatere bolig");
    }
}

/**
 * Denne funktion sletter Residential data
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.deleteResidential = async function(req, res, next) {
    try {
        const [delProduct] = await deleteResidential(req.params.id);
        req.session.flash = { 
            success:"Boligen er blevet slettet"
        };
        res.redirect('/admin/residentials');
    } catch (error) {
        console.log(error);
        res.send("Kan ikke slette bolig");
    }
}

/**
 * Denne funktion sætter primary image til Residential
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.setPrimaryImage = async function(req, res, next) {
    try { 
        console.log(req.params);
        
        const [unset] = await unsetPrimaryImage(refererRedirect(req.headers.referer).split('/').pop())
        const [set] = await setPrimaryImage(req.params.id);
        res.redirect(refererRedirect(req.headers.referer));
    } catch (error) {
        return next(error);
    }
}

/**
 * Denne funktion sletter image til Residential
 * @param {Object} req - Request-objektet returnerer værdier fra clientside
 * @param {Function} res - Response-funktionen bruges til at give svar tilbage
 * @param {Function} next - Next-funktionen kan bruges til videresendelse 
 */
exports.residentialImageRemove = async function(req, res, next) {
    try { 
        const [remove] = await residentialImageRemove(req.params.id);
        res.redirect(refererRedirect(req.headers.referer));
    } catch (error) {
        return next(error);
    }
}

