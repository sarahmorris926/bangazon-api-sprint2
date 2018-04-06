"use strict";

const prompt = require("prompt");
// const { postOne } = require("../models/paymentType.js");

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
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        // postOne(results);
        resolve(results);
      }
    );
  });
};