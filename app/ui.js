"use strict";

// 3rd party libs
const { red, magenta, blue, green } = require("chalk");
const prompt = require("prompt");
const colors = require("colors/safe");
const path = require("path");
const { Database } = require("sqlite3").verbose();
prompt.message = colors.blue("Bangazon Corp");
const {completeAPayment} = require("./controllers/productCtrl")

//controllers
const { promptNewCustomer } = require("./controllers/customerCtrl");
const { promptListAllCustomerProducts, promptListAllProducts, promptNewProduct } = require("./controllers/productCtrl");
const { promptNewPaymentType } = require("./controllers/paymentTypeCtrl");

//models
const { getAllCustomers, listAllCustomers, getOneCustomer } = require("./models/Customer");
const { getAllProducts, getCustomerProducts } = require("./models/Product");
const { getActiveCustomer } = require("./activeCustomer");

const db = new Database(path.join(__dirname, "..", "db", "bangazon.sqlite"));

prompt.start();

module.exports.displayWelcome = () => {
  let headerDivider = `${magenta(
    "*********************************************************"
  )}`;
  return new Promise((resolve, reject) => {
    console.log(`
    ${headerDivider}
    ${magenta("**  Welcome to Bangazon! Command Line Ordering System  **")}
    ${headerDivider}`);
    getActiveCustomer().id
      ? 
      console.log(
          `The Current Active User is: ${getActiveCustomer().id.choice}`
        )
      : console.log(`No active customer selected`);
    console.log(`
    ${magenta("1.")} Create a customer account
    ${magenta("2.")} Choose active customer
    ${magenta("3.")} Create a payment option
    ${magenta("4.")} Add product to sell
    ${magenta("5.")} Add product to shopping cart
    ${magenta("6.")} Complete an order
    ${magenta("7.")} Remove customer product
    ${magenta("8.")} Leave Bangazon!`);
    prompt.get(
      [
        {
          name: "choice",
          description: "Please make a selection"
        }
      ],
      mainMenuHandler
    );
  });
};

let mainMenuHandler = (err, userInput) => {
  if (userInput.choice == "1") {
    promptNewCustomer().then(custData => {
      // console.log(`
      // // ${green('Customer has been added!')}`);
      //save customer to db
    });
  } else if (userInput.choice == "2") {
    getAllCustomers().then(custData => {
      listAllCustomers(custData);
    })
    }  else if (userInput.choice == "3") {
      getActiveCustomer().id
        ? promptNewPaymentType().then(payTypeData => {
            module.exports.displayWelcome();
          })
        : console.log("PLEASE SELECT AN ACTIVE USER!") ||
          module.exports.displayWelcome();
    } else if (userInput.choice == "4") {
      if (getActiveCustomer().id === null) {
        console.log("Please select an active customer first!");
        module.exports.displayWelcome();
      } else {
        promptNewProduct();
      }
  } else if (userInput.choice == '6'){
    if ( getActiveCustomer().id != null ){
    completeAPayment(getActiveCustomer().id.choice);
    } else {
      console.log("please first choose an active customer");
      module.exports.displayWelcome();
    }
  } else if (userInput.choice == "5" && getActiveCustomer().id != null) {
    getAllProducts().then(prodData => {
      promptListAllProducts(prodData);
    })
  } else if (userInput.choice == "5"){
    console.log(`
      ${red(
        "You cannot add products to the cart until you select an active customer. Please choose an active customer to continue."
      )}`);
    module.exports.displayWelcome();
  } else if (userInput.choice == "7" && getActiveCustomer().id != null) {
    getCustomerProducts(getActiveCustomer().id.choice).then(productData => {
      promptListAllCustomerProducts(productData);
    });
  } else if (userInput.choice == "7") {
    console.log(`
      ${red(
        "You cannot delete a product until you select an active customer. Please choose an active customer to continue."
      )}`);
      module.exports.displayWelcome();
    }
};



