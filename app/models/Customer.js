"use strict";
// const { Database } = require('sqlite3').verbose();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const path = require("path");

// const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

// db.get(`SELECT * FROM customers`, (customer) => {
//   console.log(customer)
// });

module.exports.postOne = () => {
  return new Promise((resolve, reject) => {
    resolve({});
    //  db.run(`INSERT`)
  });
};

module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM customer`, (err, cust) => {
      if (err) return reject(err);
      resolve(cust);
    });
  });
};
