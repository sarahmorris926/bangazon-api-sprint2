

'use strict';

const prompt = require('prompt');
const { postOneProduct } = require('../models/Product.js');
const { getActiveCustomer } = require('../activeCustomer.js');

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
                    type: "string",
                    required: true
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
                    type: "string",
                    required: true
                }
            ],
            function(err, results) {
                if (err) return reject(err);
                results.customer_id = getActiveCustomer().id.choice;
                postOneProduct(results);
                resolve(results);
            }
        );
    });
};

