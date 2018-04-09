"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

module.exports.getAllOrders = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM orders`, (err, orders) => {
            if (err) return reject(err);
            resolve(orders);
        });
    });
};

module.exports.getOneOrder = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM orders
                WHERE orders.order_id = ${id}`, (err, order) => {
                    if (err) return reject (err);
                    resolve(order);
                })
    });
};

module.exports.postOneOrder = ({customer_id, payment_type}) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO orders VALUES(null, ${customer_id}, ${payment_type}, CURRENT_DATE)`, function(err, order) {
            if (err) return reject(err);
            resolve({order_id: this.lastID});
        });
    });
};

module.exports.getActiveOrder = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM orders 
                WHERE orders.customer_id = ${id}
                AND orders.payment_type IS NULL`, function(err, order) {
                    if (err) return reject(err);
                    resolve(order);
                })
    })
}
