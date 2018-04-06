"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const path = require("path");

module.exports.postOnePaymentType = ({ customer_id, payment_option, account_number }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO payment_type VALUES(null, "${getActiveCustomer().id.choice}", "${payment_option}", "${account_number}")`,
      function (err, payType) { 
        if (err) return reject(err);
        resolve({ payment_id: this.lastID });
      }
    );
  });
};