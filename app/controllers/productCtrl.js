"use strict";

const prompt = require("prompt");
const { getAllProducts, postOnProduct, deleteOneProduct, getOneProduct } = require("../models/Product.js");
const { getActiveCustomer} = require('../activeCustomer');
const {red, magenta, blue, green} = require("chalk");
const colors = require("colors/safe");
const { displayWelcome } = require('../ui');

module.exports.listAllCustomerProducts = (productData) => {
    let headerDivider = `${magenta('*********************************************************')}`
    return new Promise( (resolve, reject) => {
      console.log(`
      ${headerDivider}
      ${magenta("** To Delete a product enter the Product's ID number **")}
      ${headerDivider}

    ${magenta('0.')} Return to Main Menu`
    )
    productData.forEach(product => {
      console.log(`
    Product ID: ${product.product_id} - ${product.product_name}
      `);
    });

    prompt.get([{
      name: 'choice',
      description: 'Please make a selection',
      type: 'integer',
      message: "You did not enter a valid option. Please try again!"
    }], function(err, results) {
      if (err) return reject(err);
        deleteOneProduct(results.choice, getActiveCustomer().id.choice)
      });
    });
  }

