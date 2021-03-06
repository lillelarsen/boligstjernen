const db = require('../config/mysql');
/**
 * @module Model/residentials
 */

/**
 * Denne funktion opretter produkt i DB-tabellen residentials
 * @param {Object} objectInsert - Placeholder for kolonnen title, description, case_number, rent_gross, price, rent_net, residential_size, fk_category, ground_area
 */
exports.createResidential = async function(objectInsert) {
    try {
        const sql = `INSERT INTO residentials 
                            SET title = :title, description = :description, case_number = :caseNumber, rent_gross = :rentGross, price = :price, 
                            rent_net = :rentNet, residential_size = :residentialSize,  
                            fk_category = :category, ground_area = :groundArea`;
        return await db.query(sql, objectInsert);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion tæller boliger i DB-tabellen residentials
 */
exports.countResidentials = async function() {
    try {
        return await db.execute('SELECT COUNT(*) AS total_items FROM residentials');
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen residentials
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.getOneResidential = async function(id) {
    try {
        const sql = `SELECT residentials.id AS id, residentials.title, residentials.description, residentials.case_number, residentials.rent_gross, residentials.fk_category, price, rent_net, residential_size, residentials.ground_area, categories.name AS category, categories.id AS categoryId FROM residentials 
                        INNER JOIN categories ON residentials.fk_category = categories.id
                        WHERE residentials.id = :id`;
        return await db.query(sql, { id });
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen residentials
 * @param {Object} objectInsert - Placeholder for kolonnen limit, offset
 */
exports.getResidentials = async function(objectInsert) {
    try {
        const sql = `SELECT residentials.id AS id, residentials.title, residentials.description, residentials.case_number, residentials.rent_gross, residentials.fk_category, price, rent_net, residential_size, residentials.ground_area, categories.name AS category,
                        categories.name AS category, categories.id AS categoryId FROM residentials 
                        INNER JOIN categories ON residentials.fk_category = categories.id
                        ORDER BY residentials.case_number
                        LIMIT :productlimit OFFSET :productoffset`;
        return await db.query(sql, objectInsert);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion sletter data fra DB-tabellen residentials
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteResidential = async function(id) {
    try {
        const sql = `DELETE FROM residentials WHERE id = :id`;
        return await db.query(sql, { id });
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion opdtaterer data fra DB-tabellen residentials
  * @param {Object} objectInsert - Placeholder for kolonnen title, description, case_number, rent_gross, price, rent_net, residential_size, fk_category, ground_area, id
 */
exports.updateResidential = async function(objectInsert) {
    try {
        const productSQL = `UPDATE residentials SET title = :title, description = :description, case_number = :caseNumber, rent_gross = :rentGross, price = :price, 
        rent_net = :rentNet, residential_size = :residentialSize,  
        fk_category = :category, ground_area = :groundArea WHERE id = :id`;
        return await db.query(productSQL, objectInsert);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen residentials
 * @param {Object} fields - Placeholder for søgefelter/req.fields
 */
exports.searchResidential = async function(fields) {
    try {
        let searchSQL = `SELECT residentials.id AS id, residentials.title, residentials.description, residentials.case_number, residentials.rent_gross, residentials.fk_category, price, rent_net, residential_size, residentials.ground_area, categories.name AS category,
                        categories.name AS category, categories.id AS categoryId, (SELECT images.name FROM images WHERE residentials.id = images.fk_residential AND images.standard_img = 1) AS image
                        FROM residentials 
                        INNER JOIN categories ON residentials.fk_category = categories.id
                        WHERE 1=1`;

        let countSQL = `SELECT COUNT(*) AS total_items FROM residentials WHERE 1=1`;

        // hent værdierne fra querystring
    let values = fields;

    // tjek alle de værdier vi ønsker at kunne benytte i søgningen
    // sæt standard værdier hvis noget mangler

    if (values.caseNumber == undefined || isNaN(values.caseNumber)) {
        values.caseNumber = '';
    }
    if (values.category == undefined) {
        values.category = '';
    }
    if (values.minimumResidentialSize == undefined || isNaN(values.minimumResidentialSize)) {
        values.minimumResidentialSize = '';
    }
    if (values.maximumResidentialSize == undefined || isNaN(values.maximumResidentialSize)) {
        values.maximumResidentialSize = '';
    }
    if (parseInt(values.minimumResidentialSize) > parseInt(values.maximumResidentialSize)) {
        let temp = values.maximumResidentialSize;
        values.maximumResidentialSize = values.minimumResidentialSize;
        values.minimumResidentialSize = temp;
    }
    if (values.minimumGroundArea == undefined || isNaN(values.minimumGroundArea)) {
        values.minimumGroundArea = '';
    }
    if (values.maximumGroundArea == undefined || isNaN(values.maximumGroundArea)) {
        values.maximumGroundArea = '';
    }
    if (parseInt(values.minimumGroundArea) > parseInt(values.maximumGroundArea)) {
        let temp = values.maximumGroundArea;
        values.maximumGroundArea = values.minimumGroundArea;
        values.minimumGroundArea = temp;
    }
    if (values.minimumPrice == undefined || isNaN(values.minimumPrice)) {
        values.minimumPrice = '';
    }
    if (values.maximumPrice == undefined || isNaN(values.maximumPrice)) {
        values.maximumPrice = '';
    }
    if (parseInt(values.minimumPrice) > parseInt(values.maximumPrice)) {
        let temp = values.maximumPrice;
        values.maximumPrice = values.minimumPrice;
        values.minimumPrice = temp;
    }
    if (values.minimumRentGross == undefined || isNaN(values.minimumRentGross)) {
        values.minimumRentGross = '';
    }
    if (values.maximumRentGross == undefined || isNaN(values.maximumRentGross)) {
        values.maximumRentGross = '';
    }
    if (parseInt(values.minimumRentGross) > parseInt(values.maximumRentGross)) {
        let temp = values.maximumRentGross;
        values.maximumRentGross = values.minimumRentGross;
        values.minimumRentGross = temp;
    }
    if (values.minimumRentNet == undefined || isNaN(values.minimumRentNet)) {
        values.minimumRentNet = '';
    }
    if (values.maximumRentNet == undefined || isNaN(values.maximumRentNet)) {
        values.maximumRentNet = '';
    }
    if (parseInt(values.minimumRentNet) > parseInt(values.maximumRentNet)) {
        let temp = values.maximumRentNet;
        values.maximumRentNet = values.minimumRentNet;
        values.minimumRentNet = temp;
    }
    ////////////////////////////////////////////////////////////////////////
    // bestem hvor mange elementer der skal vises pr side
    if (values.items == undefined) {
        values.items = 10;
    }
    let limit = parseInt(values.items) || 10;
    // vi går som standard ud fra at det er den første side der skal vises
    
    let current_page = 1;
    // tjek at page findes i querystring og at det er et tal
    if (values.page != undefined) {
        if (parseInt(values.page) < 1) {
            res.redirect('/boliger');
            return;
        }
        if (parseInt(values.page) >= 1) {
            current_page = parseInt(values.page);
        }
    }
        // beregn hvor mange produkter der skal springes over 
        // for at vise den pågældende side
         let offset = (current_page - 1) * limit;
 
         if(offset == '' && offset == undefined) {
             offset = 0;
         }
 
        // start params samlingen, den skal bare være tom til at starte med
        let sql_params = []

        if (values.caseNumber != undefined && values.caseNumber != '') {
            searchSQL += ' AND residentials.case_number LIKE ? ';
            countSQL += ' AND residentials.case_number LIKE ? ';
            sql_params.push('%' + values.caseNumber + '%');
        }
        
        if (Object.prototype.toString.call(values.category) == "[object Array]") {
            
            searchSQL += ` AND ( `;
            sqlParts = [];

            values.category.forEach(value => {
                sqlParts.push(` (residentials.fk_category = ${value}) `);
            });

            searchSQL += sqlParts.join(' OR ')

            searchSQL += ` ) `;

            countSQL += ` AND ( `;
            sqlPartsCount = [];

            values.category.forEach(value => {
                sqlPartsCount.push(` (residentials.fk_category = ${value}) `);
            });

            countSQL += sqlPartsCount.join(' OR ')

            countSQL += ` ) `;
        } else if (values.category != undefined && values.category != '') {
                searchSQL += ' AND residentials.fk_category = ? ';
                countSQL += ' AND residentials.fk_category = ? ';
                sql_params.push(parseInt(values.category));
        }

        if (values.minimumResidentialSize != undefined && values.minimumResidentialSize != '') {
            searchSQL += ' AND residentials.residential_size >= ? ';
            countSQL += ' AND residentials.residential_size >= ? ';
            sql_params.push(parseInt(values.minimumResidentialSize));
        }
        if (values.maximumResidentialSize != undefined && values.maximumResidentialSize != '') {
            searchSQL += ' AND residentials.residential_size <= ? ';
            countSQL += ' AND residentials.residential_size <= ? ';
            sql_params.push(parseInt(values.maximumResidentialSize));
        }
        if (values.minimumGroundArea != undefined && values.minimumGroundArea != '') {
            searchSQL += ' AND residentials.ground_area >= ? ';
            countSQL += ' AND residentials.ground_area >= ? ';
            sql_params.push(parseInt(values.minimumGroundArea));
        }
        if (values.maximumGroundArea != undefined && values.maximumGroundArea != '') {
            searchSQL += ' AND residentials.ground_area <= ? ';
            countSQL += ' AND residentials.ground_area <= ? ';
            sql_params.push(parseInt(values.maximumGroundArea));
        }
        if (values.minimumPrice != undefined && values.minimumPrice != '') {
            searchSQL += ' AND residentials.price >= ? ';
            countSQL += ' AND residentials.price >= ? ';
            sql_params.push(parseInt(values.minimumPrice));
        }
        if (values.maximumPrice != undefined && values.maximumPrice != '') {
            searchSQL += ' AND residentials.price <= ? ';
            countSQL += ' AND residentials.price <= ? ';
            sql_params.push(parseInt(values.maximumPrice));
        }
        if (values.minimumRentGross != undefined && values.minimumRentGross != '') {
            searchSQL += ' AND residentials.rent_gross >= ? ';
            countSQL += ' AND residentials.rent_gross >= ? ';
            sql_params.push(parseInt(values.minimumRentGross));
        }
        if (values.maximumRentGross != undefined && values.maximumRentGross != '') {
            searchSQL += ' AND residentials.rent_gross <= ? ';
            countSQL += ' AND residentials.rent_gross <= ? ';
            sql_params.push(parseInt(values.maximumRentGross));
        }
        if (values.minimumRentNet != undefined && values.minimumRentNet != '') {
            searchSQL += ' AND residentials.rent_net >= ? ';
            countSQL += ' AND residentials.rent_net >= ? ';
            sql_params.push(parseInt(values.minimumRentNet));
        }
        if (values.maximumRentNet != undefined && values.maximumRentNet != '') {
            searchSQL += ' AND residentials.rent_net <= ? ';
            countSQL += ' AND residentials.rent_net <= ? ';
            sql_params.push(parseInt(values.maximumRentNet));
        }

        if (values.page != undefined && values.page != '' && values.items != undefined && values.items != '') {
            values.page = 1;
            values.items = 10;
        }

        if (values.page != undefined && values.page != '' && values.items != undefined && values.items != '') {
            if (limit >= 0 && offset >= 0) {
                searchSQL += ' LIMIT ? OFFSET ? ';
                sql_params.push(limit, offset);
            }
        }

         // find ud af hvor mange produkter der er i databasen
         let [result] = await db.execute(countSQL, sql_params);         
         let total_items = result[0].total_items;
 
         // beregn hvor mange sider der er i alt, 
         // baseret på antal elementer og elementer pr side
         let total_pages = Math.ceil(total_items / limit);
 
         // hvis "offset" er større end totalle antal items, så indlæses den sidste side
         if (offset > total_items) {
             res.redirect(`/boliger?page=${total_pages}&items=${limit}`);
             return;
         }

         const [rows] = await db.query(searchSQL, sql_params);
         return {
            rows,
            total_pages,
            current_page,
            limit,
            values
         }
        } catch (error) {
            console.log(error);
            return null;
        }
}