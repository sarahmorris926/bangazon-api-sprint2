"use strict";

const prompt = require("prompt");
const { postOnePaymentType } = require("../models/paymentType.js");

// TODO: must make sure an active customer was selected - ternary
// TODO: no duplicate account numbers - get all payment types, and do if statement for the payment type doesn't equal other account numbers
// TODO: make sure a valid payment type (have list of options?)
// TODO: make sure account number is only 16 digits
module.exports.promptNewPaymentType = () => {
  return new Promise((resolve, reject) => {
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
          // pattern: /^[a-z]{0,3}$/, 
          // minLength: 1,
          // maxLength: 3,
          // message: "Please enter a 16 digit account number",
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        postOnePaymentType(results);
        resolve(results);
      }
    );
  });
};