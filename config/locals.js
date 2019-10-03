const db = require('../config/mysql');

module.exports = function(app) {
    app.use(function(req, res, next) {
        if(typeof req.app.locals.isLoggedIn === "undefined") {
            req.app.locals.isLoggedIn = false;
        }
        req.app.locals.user = req.session.user;
        
        next();
    });

    app.use(function(req, res, next) {
        db.query(`SELECT * FROM globals`, (err, site) => {
			if (err) return next(`${err} at db.query (${__filename}:4:5)`);
			req.app.locals.site = site[0];
            next()
		});	
    })
    
    app.use(function(req, res, next) {
        db.query(`SELECT residentials.* , categories.name AS category,
                (SELECT images.name FROM images WHERE residentials.id = images.fk_residential AND images.standard_img = 1) AS image
                FROM residentials 
                INNER JOIN categories ON residentials.fk_category = categories.id
                ORDER BY RAND() LIMIT 1`, (err, randomResidentials) => {
            if (err) return next(`${err} at db.query (${__filename}:4:5)`);
			req.app.locals.randomResidential = randomResidentials[0];
            next()
		});	
    })

}
