'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");
const { getActiveCustomer } = require('../activeCustomer');

module.exports.postOneProduct = ({product_name, price, description, quantity}) => {
    return new Promise((resolve, reject) => {
            db.run(`INSERT INTO product VALUES(${null}, "${product_name}", "1", "${price}", "${description}", "${getActiveCustomer().id.choice}", "2018-04-06", "${quantity}")`, function(err, prod) {
                if (err) return reject(err);
                resolve({product_id: this.lastID});
            });

    });
};

module.exports.getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM product
                WHERE product.product_id = ${id}`, (err, product) => {
                    if (err) return reject(err);
                    resolve(product);
                });
    });
};

module.exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM product`, (err, prods) => {
            if (err) return reject(err);
            resolve(prods);
        });
    });
};