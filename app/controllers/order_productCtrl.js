"use strict";

const prompt = require("prompt");
const { getAllOrderProducts, postOneOrderProduct } = require("../models/Order_Product")
const { getActiveOrder } = require("../models/Order")
const { getOneProduct } = require("../models/Product")

module.exports.addProductToOrder = (id, prodId, quantity) => {
    return new Promise((resolve, reject) => {
        return getOneProduct(prodId).then(product => {
            if(product.quantity > quantity) {
                 let newOrderPrice = product.price * quantity;
                  getActiveOrder(id).then(order => {
                      if(order !== undefined) {
                          resolve(order);
                      } else {
                          resolve(product);
                      }
                  });
            };
        });
    });
};