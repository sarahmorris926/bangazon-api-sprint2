"use strict";
// const { Database } = require('sqlite3').verbose();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const path = require("path");

const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
prompt.message = colors.blue("Bangazon Corp");

// const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

// db.get(`SELECT * FROM customers`, (customer) => {
//   console.log(customer)
// });

module.exports.postOne = ({ first_name,last_name,street,city,state,zip,phone}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO customer VALUES(${null}, "${first_name}", "${last_name}", "${street}", "${city}", "${state}", "${zip}", "${phone}")`,
      function (err, cust) {
        if (err) return reject(err);
        resolve({customer_id: this.lastID});
      }
    );
  });
};


// GET functions
module.exports.getAll = () => {
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
      ${cust.customer_id} ${cust.first_name}  ${cust.last_name} 
    `);
  });
  prompt.get([{
    name: 'choice',
    description: 'Please make a selection'
  }],);
  });
}




module.exports.displayWelcome = () => {
  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise( (resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to shopping cart
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Leave Bangazon!`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler );
  });
};

module.exports.getOne = (id) => {
  return new Promise( (resolve, reject) => {
    db.get(`SELECT * FROM customer
            WHERE customer.customer_id = ${id}`, 
          (err, customer) => {
            if (err) return reject(err);
            resolve(customer);
          })
  })
}


