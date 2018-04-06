"use strict";

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const path = require("path");

module.exports.postOne = ({ customer_id, payment_option, account_number }) => {
  return new Promise((resolve, reject) => {
    resolve({});

  });
};