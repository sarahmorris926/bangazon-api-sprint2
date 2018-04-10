"use strict";

const prompt = require("prompt");
const {
  postOnePaymentType,
  getCustomerPaymentTypes,
  getCustomerPaymentTypeDuplicates
} = require("../models/paymentType.js");
const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const ui = require("../ui");

module.exports.promptNewPaymentType = () => {
  return new Promise((resolve, reject) => {
    let customerId = getActiveCustomer().id.choice;
    prompt.get(
      [
        {
          name: "payment_option",
          description: "Enter payment type (e.g. AmEx, Visa, Mastercard)",
          type: "string",
          required: true
        },
        {
          name: "account_number",
          description: "Enter account number",
          type: "integer",
          required: true,
          message: "Please enter a number for account number"
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        getCustomerPaymentTypeDuplicates(
          customerId,
          results.account_number
        ).then(duplicate => {
          if (duplicate.length > 0) {
            console.log("This account number already exist for this costumer");
            ui.displayWelcome();
          } else {
            console.log(`You're payment type was successfully added!`)
            results.customer_id = customerId;
            postOnePaymentType(results);
            resolve(results);
          }
        });
      }
    );
  });
};
