"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const path = require("path");

//POST ACTIVE CUSTOMERS PAYMENT TYPE
module.exports.postOnePaymentType = ({
  customer_id,
  payment_option,
  account_number
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO payment_type VALUES(null, "${customer_id}", "${payment_option}", "${account_number}")`,
      function(err, payType) {
        if (err) return reject(err);
        resolve({ payment_id: this.lastID });
      }
    );
  });
};

//GET ALL PAYMENT TYPES
module.exports.getAllPaymentTypes = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM payment_type`, (err, paymentTypes) => {
      if (err) return reject(err);
      resolve(paymentTypes);
    });
  });
};

//GET ACTIVE CUSTOMERS PAYMENT TYPES
module.exports.getCustomerPaymentTypes = id => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM payment_type
       WHERE payment_type.customer_id = ${id}`,
      (err, paymentTypes) => {
        if (err) return reject(err);
        resolve(paymentTypes);
      }
    );
  });
};

//GET ACTIVE CUSTOMERS DUPLICATE PAYMENT TYPES
module.exports.getCustomerPaymentTypeDuplicates = (
  customerId,
  accountNumber
) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM payment_type
      WHERE payment_type.customer_id = ${customerId}
      AND payment_type.account_number = ${accountNumber}`,
      (err, paymentTypeDuplicate) => {
        if (err) return reject(err);
        resolve(paymentTypeDuplicate);
      }
    );
  });
};
