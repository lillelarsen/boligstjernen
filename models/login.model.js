const db = require('../config/mysql');
/**
 * @module Model/users
 */

  /**
 * Denne funktion henter data fra DB-tabellen users
 */
exports.checkLogin = async function(username) {
    try {
        const userSql = `SELECT id, password FROM users WHERE username = :username`;
        return await db.query(userSql, {username});
    } catch (error) {
        console.log(error);
        return null;
    }
};