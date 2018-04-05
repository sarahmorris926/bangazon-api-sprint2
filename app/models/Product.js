'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

module.exports.postOne = () => {
    return new Promise((resolve, reject) => {
        resolve({});
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