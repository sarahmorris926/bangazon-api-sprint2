"use strict";

const prompt = require("prompt");
const { getAllProducts, postOnProduct, deleteOneProduct, getOneProduct } = require("../models/Product.js");
const { getActiveCustomer} = require('../activeCustomer');
const {red, magenta, blue, green} = require("chalk");
const colors = require("colors/safe");

module.exports.listAllCustomerProducts = (productData) => {
    let headerDivider = `${magenta('*********************************************************')}`
    return new Promise( (resolve, reject) => {
      console.log(`
      ${headerDivider}
      ${magenta('** Choose the Product you want to Delete **')}
      ${headerDivider}`
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
      message: "The product you selected is either attached to an existing order and can't be deleted, or does not exist. Please try again!"
    }], function(err, results) {
      if (err) return reject(err);
      deleteOneProduct(results.choice, getActiveCustomer().id.choice)
    });
    });
  }

