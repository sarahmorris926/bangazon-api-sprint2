'use strict';

// 3rd party libs
const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue("Bangazon Corp");


// app modules
const { promptNewCustomer, getAllCustomers } = require('./controllers/customerCtrl');
const { listAllCustomerProducts } = require('./controllers/productCtrl');
const { getAll, listAllCustomers } = require('./models/Customer');
const { getAllProducts, getCustomerProducts } = require('./models/Product');
const { getActiveCustomer } = require('./activeCustomer');

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

let mainMenuHandler = (err, userInput) => {
  console.log("user input", userInput);
  // This could get messy quickly. Maybe a better way to parse the input?
  if(userInput.choice == '1') {
    promptNewCustomer()
    .then( (custData) => {
      console.log('customer data to save', custData );
      //save customer to db
    });
  } else if (userInput.choice == '2') {
    getAll()
    .then( (custData) => {
      listAllCustomers(custData);
    })
  } else if (userInput.choice == '7' && getActiveCustomer().id != null) {
    console.log("what is getActiveCustomer", getActiveCustomer().id.choice);
    getCustomerProducts(getActiveCustomer().id.choice)
    .then( (productData) => {
      listAllCustomerProducts(productData);
    })
  } else if (userInput.choice == '7') {
    console.log('You cannot delete a product until you select an active customer. Please choose an active customer to continue!');
    module.exports.displayWelcome();
  }
};

module.exports.displayWelcome = () => {
  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise( (resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}`);
  getActiveCustomer().id ? console.log(`The Current Active User is: ${getActiveCustomer().id.choice}`) : console.log(`No active customer selected`);
  console.log(`
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to shopping cart
  ${magenta('5.')} Complete an order
  ${magenta('6.')} See product popularity
  ${magenta('7.')} Remove customer product
  ${magenta('8.')} Leave Bangazon!`); 
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler );
  });
};
