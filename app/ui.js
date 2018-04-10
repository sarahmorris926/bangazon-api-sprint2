

'use strict';

// 3rd party libs
const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue("Bangazon Corp");
const {completeAPayment} = require("./controllers/productCtrl")

// app modules
const { promptNewCustomer, getAllCustomers } = require('./controllers/customerCtrl');
const { getAll, listAllCustomers } = require('./models/Customer');
const { getActiveCustomer } = require('./activeCustomer');

//cb require getAllProducts
const {getOneProduct} = require('./models/Product');

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

let mainMenuHandler = (err, userInput) => {
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
  } else if (userInput.choice == '5'){
    if ( getActiveCustomer().id != null ){
    completeAPayment(getActiveCustomer().id.choice);
    } else {
      console.log("please first choose an active customer");
    }
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
  ${magenta('7.')} Leave Bangazon!`); 
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler );
  });
};
