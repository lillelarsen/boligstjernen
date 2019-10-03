const db = require('../config/mysql');
const fs = require('fs');

const { join } = require('path');
const uploadDir = '../public/images/site-content/';
/**
 * @module Model/globals
 */

/**
 * Denne funktion viser data fra DB-tabellen globals
 */
exports.getGlobals = async function() {
    try {
        const globalSQL = `SELECT id, sitename, sitedescription, company_name, street, street_number, postal_code, city, phone, telefax, email, img_home FROM globals`;
        return await db.query(globalSQL, {});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen opening_hours
 */
exports.getHours = async function() {
    try {
        const hoursSQL = `SELECT id, weekday, opens, closing, closed FROM opening_hours`;
        return await db.query(hoursSQL, {});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion viser data fra DB-tabellen globals
 * @param {Object} insertObject - Placeholder object for kolonnerne opens, closing, closed, id
 */
exports.updateHours = async function(insertObject) {
    try {
        const globalSQL = `UPDATE opening_hours SET opens = :opens, closing = :closing, closed = :closed
        WHERE id = :id`;
        return await db.query(globalSQL, insertObject);
    } catch (error) {
        console.log(error);
        return null;
    }
}
/**
 * Denne funktion viser data fra DB-tabellen globals
 * @param {Object} insertObject - Placeholder object for kolonnerne sitename, sitedescription, company_name, street, street_number, postal_code, city, phone, telefax, email, id
 */
exports.updateGlobals = async function(insertObject) {
    try {
        const globalSQL = `UPDATE globals SET sitename = :name, sitedescription = :description, company_name = :companyName, street = :street, street_number = :street_number, postal_code = :postal_code,
        city = :city, phone = :phone, telefax = :telefax, email= :email   
        WHERE id = :id`;
        return await db.query(globalSQL, insertObject);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion opdatere data fra DB-tabellen globals
 *  @param {Object} files - Placeholder object for req.files
 *  @param {Object} fields - Placeholder object for req.fields
 *  @param {Object} insertObject - Placeholder object for kolonnerne img_home, id
 *  @param {String} newFileName - Placeholder for billedets navn
 */
exports.updateHomeImg = async function(files, fields, insertObject, newFileName) {
    try {
        const data = fs.readFileSync(files.photo.path);
        const getnewFileName = newFileName;
        fs.writeFileSync(join(__dirname, uploadDir + getnewFileName), data);
        if(fields.prevImg) {
            fs.unlinkSync(join(__dirname, uploadDir + fields.prevImg));
        }
        const globalSQL = `UPDATE globals SET img_home = :name WHERE id = :id`;
        return await db.query(globalSQL, insertObject);
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion opdatere data fra DB-tabellen globals
 *  @param {Object} fields - Placeholder object for req.fields
 *  @param {Object} insertObject - Placeholder object for kolonnerne img_home, id
 */
exports.deleteHomeImg = async function(fields, insertObject) {
    try {   
        if(fields.prevImg) {
            fs.unlinkSync(join(__dirname, uploadDir + fields.prevImg));
        }
        const globalSQL = `UPDATE globals SET img_home = :name WHERE id = :id`;
        return await db.query(globalSQL, insertObject);
    } catch (error) {
        console.log(error);
        return null;
    }
}

