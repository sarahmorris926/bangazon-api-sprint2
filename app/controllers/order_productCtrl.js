"use strict";

const prompt = require("prompt");
const { getAllOrderProducts, postOneOrderProduct } = require("../models/Order_Product")
const { getActiveOrder, postOneOrder } = require("../models/Order")
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
                          let newOrder = {
                              customer_id: id,
                              payment_type: null
                          }
                          postOneOrder(newOrder).then(postedOrder => {
                              resolve(postedOrder);
                          })

                      }
                  });
            };
        });
    });
};