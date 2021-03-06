const db = require('../config/mysql');
const { readFileSync, writeFileSync, unlinkSync } = require('fs');
var Jimp = require('jimp');
const { join } = require('path');
const uploadDir = '../public/images/uploads/';
/**
 * @module Model/images
 */

  /**
 * Denne funktion viser data fra DB-tabellen images
 * @param {Number} id - Placeholder object for kolonnen fk_residential
 */
exports.showImageByResidentialId = async function(id) {
    try {
        const imagesSQL = `SELECT id, name FROM images
                            WHERE fk_residential = :id`;
        return await db.query(imagesSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} imageId - Placeholder object for kolonnen images.id
 */
exports.residentialImageRemove = async function(imageId) {
    try {
        const sql = `UPDATE images SET fk_residential = 0, standard_img = 0 WHERE images.id = :imageId`;
        return await db.query(sql, { imageId });
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion henter data i DB-tabellen images
 */
exports.getImages = async function() {
    try {
        const imagesSQL = `SELECT id, name, fk_residential FROM images`;
        return await db.query(imagesSQL, {});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion henter data i DB-tabellen images
 * @param {Number} id - Placeholder object for kolonnen fk_residential
 */
exports.getImagesFromResidential = async function(id) {
    try {
        const imagesSQL = `SELECT id, name, standard_img, fk_residential FROM images WHERE fk_residential = :id`;
        return await db.query(imagesSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} id - Placeholder object for kolonnen id
 */
exports.getImageEditForm = async function(id) {
    try {
        const imagesSQL = `SELECT id, name FROM images WHERE id = :id`;
        return await db.query(imagesSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} imageId - Placeholder object for kolonnen imageId
 */
exports.deleteImage = async function(id, request) {
    try {
        const imageSQL = `DELETE FROM images WHERE id = :id`;
        unlinkSync(join(__dirname, uploadDir + request.image));
        unlinkSync(join(__dirname, uploadDir + '120x90-' + request.image));
        unlinkSync(join(__dirname, uploadDir + '400x300-' + request.image));
        return await db.query(imageSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} imageId - Placeholder object for kolonnen imageId
 */
exports.updateImage = async function(request, insertObject, newFileName) {
    try {
        const data = readFileSync(request.billede.path);
        
        const imagePath = join(__dirname, uploadDir + newFileName);
        const result = await db.query('UPDATE images SET name = :name WHERE id = :id', insertObject);
        writeFileSync(imagePath, data);
        const resizedBig = `400x300-${newFileName}`;
        const newImagePathBig = join(__dirname, uploadDir + resizedBig);

        const resizedSmall = `120x90-${newFileName}`;
        const newImagePathSmall = join(__dirname, uploadDir + resizedSmall);
        
        const resizeImgBig = await Jimp.read(imagePath);
        const bigDone = await resizeImgBig
                .scaleToFit(400, 300) // resize
                .write(newImagePathBig); // save

        const resizeImgSmall = await Jimp.read(imagePath);
        const smallDone = await resizeImgSmall
                .scaleToFit(120, 90) // resize
                .write(newImagePathSmall); // save

        unlinkSync(join(__dirname, uploadDir + req.fields.prevImage));
        unlinkSync(join(__dirname, uploadDir + '120x90-' + req.fields.prevImage));
        unlinkSync(join(__dirname, uploadDir + '400x300-' + req.fields.prevImage));

        const imagesSQL = `SELECT id, name FROM images WHERE id = :id`;
        return await db.query(imagesSQL, {id});
    } catch (error) {
        console.log(error);
        return null;
    }
}

  /**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} imageId - Placeholder object for kolonnen imageId
 */
exports.imageUploadResize = async function(imagelist) {
    try {
        await imagelist.forEach(async image => {
            const data = readFileSync(image.path);
                if (!/image/.test(image.type)) {
                    return res.send('Den uploadede fil er ikke et billede');
                }
            const newFileName = await Date.now() + '_' + image.name;
            const imagePath = join(__dirname, uploadDir + newFileName);
            writeFileSync(imagePath, data);
            
            const resizedBig = `400x300-${newFileName}`;
            const newImagePathBig = join(__dirname, uploadDir + resizedBig);
            
            const resizedSmall = `120x90-${newFileName}`;
            const newImagePathSmall = join(__dirname, uploadDir + resizedSmall);
            
            const resizeImgBig = await Jimp.read(imagePath);
            const bigDone = await resizeImgBig
            .resize(400, 300) // resize
            .write(newImagePathBig); // save
            
            const resizeImgSmall = await Jimp.read(imagePath);
            const smallDone = await resizeImgSmall
            .resize(120, 90) // resize
            .write(newImagePathSmall); // save
            
            return await db.query('INSERT INTO images SET name = ?', [newFileName]);
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

 /**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} id - Placeholder object for kolonnen id
 */
exports.setImageToResidential = async function(insertObject) {
    try {
        const imageSQL = `UPDATE images SET fk_residential = :product WHERE id = :id`;
        return await db.query(imageSQL, insertObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};

 /**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} id - Placeholder object for kolonnen id
 */
exports.updateImageToResidential = async function(insertObject) {
    try {
        const imageSQL = `UPDATE images SET fk_residential = :product,  standard_img = :standard_img WHERE id = :id`;
        return await db.query(imageSQL, insertObject);
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} id - Placeholder object for kolonnen id
 */
exports.setPrimaryImage = async function(id) {
    try {
        const sql = `UPDATE images SET standard_img = 1 WHERE id = :id`;
        return await db.query(sql, { id });
    } catch (error) {
        console.log(error);
        return null;
    }
};

  /**
 * Denne funktion opdatere data i DB-tabellen images
 * @param {Number} productId - Placeholder object for kolonnen productId
 */
exports.unsetPrimaryImage = async function(productId) {
    try {
        const sql = `UPDATE images SET standard_img = 0 WHERE fk_residential = :productId`;
        return await db.query(sql, { productId });
    } catch (error) {
        console.log(error);
        return null;
    }
}