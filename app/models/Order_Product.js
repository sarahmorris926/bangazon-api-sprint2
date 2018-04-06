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

