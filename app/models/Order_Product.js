"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");


module.exports.getAllOrderProducts = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM order_product`, (err, ordP) => {
            if (err) return reject(err);
            resolve(ordP);
        });
    });
}

module.exports.getOneOrderProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM order_product
                WHERE line_id = ${id}`, (err, ordP) => {
                    if (err) return reject(err);
                    resolve(ordP);
        });
    });
};

module.exports.postOneOrderProduct = ({order_quantity, order_id, product_id, price}) => {
    return new Promise((resolve, reject) => {
        module.exports.getLastOrderProduct().then(lineID => {
            let id = lineID + 1;
            db.run(`INSERT into order_product VALUES(${id}, ${order_quantity}, ${order_id}, ${product_id}, ${price})`, function(err, order) {
                if (err) return reject(err);
                resolve({line_id: this.lastID});
            })
        })
    })
}

module.exports.getLastOrderProduct = () => {
    return new Promise((resolve, reject) => {
        module.exports.getAllOrderProducts().then(ordProds => {
            let arrayLength = ordProds.length - 1;
            let lastObj = ordProds[arrayLength];
            resolve(lastObj.line_id);
            });
        });
   };