const db = require('../config/mysql');
/**
 * @module Model/contact
 */

  /**
 * Denne funktion henter/tæller data fra DB-tabellen contact
 */
exports.countContact = async function() {
    try {
        const sql = `SELECT COUNT(*) AS total_items FROM contact`;
        return await db.query(sql);
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Denne funktion henter data fra DB-tabellen contact
 * @param {Number} id - Placeholder for kolonnen limit og offset
 */
exports.getContact = async function(insertsObject) {
    try {
        const sql = `SELECT contact.id, contact.name, contact.adress, contact.phone, contact.email, contact.message
                        FROM contact 
                        ORDER BY contact.name
                        LIMIT :limit OFFSET :offset`;

                        
        const test = await db.query(sql, insertsObject);
        return test;
    } catch (error) {
        console.log(error);
        return null;
    }
};

/**
 * Denne funktion indsætter data fra DB-tabellen contact
 * @param {Number} id - Placeholder for kolonnen name, adress, phone, email, message
 */
exports.createMessage = async function(insertsObject) {
    try {
        const sql = `INSERT INTO contact
        SET name = :name, adress = :adress, phone = :phone, email = :email, message = :message`;     
        const test = await db.query(sql, insertsObject);
        return test;
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdaterer data i DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.getContactById = async function(id) {
    try {
        const messageSQL = `SELECT contact.id, contact.name, contact.adress, contact.phone, contact.email, contact.message
                        FROM contact
                        WHERE contact.id = :id`;
        return await db.query(messageSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};


  /**
 * Denne funktion sletter data fra DB-tabellen categories
 * @param {Number} id - Placeholder for kolonnen id
 */
exports.deleteContact = async function(id) {
    try {
        const sql = `DELETE FROM contact WHERE id = :id`;
        return await db.query(sql, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};