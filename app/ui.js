
'use strict';

// 3rd party libs
const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue("Bangazon Corp");


// app modules
const { promptNewCustomer } = require('./controllers/customerCtrl');
const { getAllCustomers, listAllCustomers } = require('./models/Customer');
const { getActiveCustomer } = require('./activeCustomer');
const { promptNewProduct } = require('./controllers/productCtrl');

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
    getAllCustomers()
    .then( (custData) => {
      listAllCustomers(custData);
    })
  } else if (userInput.choice == '4') {
      promptNewProduct()
      .then( (prodData) => {
          console.log('product to save', prodData);
      })

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
  ${magenta('4.')} Add product to sell
  ${magenta('5.')} Add product to shopping cart
  ${magenta('6.')} Complete an order
  ${magenta('7.')} See product popularity
  ${magenta('8.')} Leave Bangazon!`); 
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler );
  });
};
