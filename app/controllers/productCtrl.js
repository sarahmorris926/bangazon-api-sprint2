

'use strict';

const prompt = require('prompt');
const { postOneProduct } = require('../models/Product.js');
const { getActiveCustomer } = require('../activeCustomer.js');
const ui = require('../ui');

module.exports.promptNewProduct = () => {
    return new Promise((resolve, reject) => {
        prompt.get(
            [
                {
                    name: "product_name",
                    description: "Enter the product name",
                    type: "string",
                    required: true
                },
                {
                    name: "price",
                    description: "Enter the price",
                    type: "integer",
                    required: true,
                    message: "You did not enter a valid price. Please enter a number."
                },
                {
                    name: "description",
                    description: "Description",
                    type: "string",
                    required: true
                },
                {
                    name: "quantity",
                    description: "Quantity",
                    type: "integer",
                    required: true,
                    message: "You did not enter a valid quantity. Please enter a number."
                }
            ],
            function(err, results) {
                if (err) return reject(err);
                results.customer_id = getActiveCustomer().id.choice;
                postOneProduct(results);
                console.log(`Product has been added: ${results.product_name}`)
                // resolve(results);
                ui.displayWelcome();
            }
        );
    });
};

