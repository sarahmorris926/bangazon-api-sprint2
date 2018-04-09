"use strict";

const prompt = require("prompt");
const {
  postOnePaymentType,
  getCustomerPaymentTypes,
  getCustomerPaymentTypeDuplicates
} = require("../models/paymentType.js");
const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");
const ui = require("../ui");

// TODO: must make sure an active customer was selected - ternary - DONE
// TODO: no duplicate account numbers - get all payment types, and do if statement for the payment type doesn't equal other account numbers
// TODO: make sure a valid payment type (have list of options?)
// TODO: make sure account number is only 16 digits - probs not important
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
          type: "string",
          required: true
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
            postOnePaymentType(results);
            resolve(results);
          }
        });
      }
    );
  });
};
