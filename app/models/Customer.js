"use strict";
// const { Database } = require('sqlite3').verbose();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const { displayWelcome } = require('../ui');
const path = require("path");

const { red, magenta, blue, green } = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
prompt.message = colors.blue("Bangazon Corp");

module.exports.postOneCustomer = ({ first_name,last_name,street,city,state,zip,phone}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO customer VALUES(${null}, "${first_name}", "${last_name}", "${street}", "${city}", "${state}", "${zip}", "${phone}")`,
      function (err, cust) {
        if (err) return reject(err);
        console.log(`
  ${green('Customer has been added!')}`)
        resolve({customer_id: this.lastID});
      }
    );
  });
};


// GET functions
module.exports.getAllCustomers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM customer`, (err, cust) => {
      if (err) return reject(err);
      resolve(cust);
    });
  });
};

module.exports.listAllCustomers = (customerData) => {
  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise( (resolve, reject) => {
    console.log(`
    ${headerDivider}
    ${magenta('** Choose your Active Customer **')}
    ${headerDivider}`
  )
  customerData.forEach(cust => {
    console.log(`
      ${cust.customer_id}. ${cust.first_name}  ${cust.last_name} 
    `);
  });
  prompt.get([{
    name: 'choice',
    description: 'Please make a selection',
    type: 'integer',
    minimum: 1,
    maximum: customerData.length,
    message: "You did not enter a valid customer ID. Please try again!"
  }], function(err, results) {
    if (err) return reject(err);
    setActiveCustomer(results)
  });
  });
}

module.exports.getOneCustomer = (id) => {
  return new Promise( (resolve, reject) => {
    db.get(`SELECT * FROM customer
            WHERE customer.customer_id = ${id}`, 
          (err, customer) => {
            if (err) return reject(err);
            resolve(customer);
          })
  })
}


