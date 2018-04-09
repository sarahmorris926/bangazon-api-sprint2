"use strict";

const prompt = require("prompt");
const { getAllOrderProducts, postOneOrderProduct } = require("../models/Order_Product")
const { getActiveOrder, postOneOrder } = require("../models/Order")
const { getOneProduct } = require("../models/Product")

module.exports.addProductToOrder = (id, prodId, quantity) => {
    return new Promise((resolve, reject) => {
        return getOneProduct(prodId).then(product => {
            if(product.quantity > quantity) {
                console.log("price", product);
                 let newOrderPrice = product.price * quantity;
                  getActiveOrder(id).then(order => {
                      if(order !== undefined) {
                          let ordProdObj = {
                              order_quantity: quantity,
                              order_id: order.order_id,
                              product_id: prodId,
                              price: newOrderPrice
                          }
                          postOneOrderProduct(ordProdObj);
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