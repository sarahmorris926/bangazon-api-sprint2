'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

module.exports.postOne = ({product_name, product_type, price, description, customer_id, listing_date, quantity}) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO product VALUES(${null}, "${product_name}", "${product_type}", "${price}", "${description}", "${customer_id}", "${listing_date}", "${quantity}")`, function(err, prod) {
            if (err) return reject(err);
            resolve({product_id: this.lastID});
        });
    });
};

module.exports.getOne = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM product
                WHERE product.product_id = ${id}`, (err, product) => {
                    if (err) return reject(err);
                    resolve(product);
                });
    });
};