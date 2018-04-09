"use strict";

const prompt = require("prompt");
const { getAllOrderProducts, postOneOrderProduct } = require("../models/Order_Product")
const { getOneProduct } = require("../models/Product")

module.exports.addProductToOrder = (id, prodId, quantity) => {
    return new Promise((resolve, reject) => {
        return getOneProduct(prodId).then(product => {
            resolve(product);
            // if(product.quantity > quantity)
        });
    });
}