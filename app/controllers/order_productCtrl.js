"use strict";

const prompt = require("prompt");
const { getAllOrderProducts, postOneOrderProduct } = require("../models/Order_Product")

module.exports.postOrderProductWithId = () => {
    return new Promise((resolve, reject) => {
        getAllOrderProducts().then(ordProds => {
            let arrayLength = ordProds.length - 1;
            let lastObj = ordProds[arrayLength];
            return postOneOrderProduct(lastObj.line_id).then(postedOP => {
                resolve(lastObj.line_id);
            });
        });
    });
};