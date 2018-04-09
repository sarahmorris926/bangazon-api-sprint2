"use strict";

const prompt = require("prompt");
const { getAllCustomers, postOneCustomer } = require("../models/Customer.js");
const ui = require('../ui');

module.exports.promptNewCustomer = () => {
  return new Promise((resolve, reject) => {
    prompt.get(
      [
        {
          name: "first_name",
          description: "Enter customer name (First Name)",
          type: "string",
          required: true
        },
        {
          name: "last_name",
          description: "Enter customer name (Last Name)",
          type: "string",
          required: true
        },
        {
          name: "street",
          description: "Enter street address",
          type: "string",
          required: true
        },
        {
          name: "city",
          description: "Enter city",
          type: "string",
          required: true
        },
        {
          name: "state",
          description: "Enter state (KY)",
          type: "string",
          required: true
        },
        {
          name: "zip",
          description: "Enter postal code",
          type: "string",
          required: true
        },
        {
          name: "phone",
          description: "Enter phone number (xxx-yyy-zzzz)",
          type: "string",
          required: true
        }
      ],
      function(err, results) {
        if (err) return reject(err);
        postOneCustomer(results);
        ui.displayWelcome();
        resolve(results);
      }
    );
  });
};


