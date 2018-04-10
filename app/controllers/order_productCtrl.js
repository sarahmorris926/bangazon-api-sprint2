"use strict";

const prompt = require("prompt");
const { getAllOrderProducts, postOneOrderProduct } = require("../models/Order_Product")
const { getActiveOrder, postOneOrder } = require("../models/Order")
const { getOneProduct } = require("../models/Product")
const ui = require("../ui")
const productCtrl = require("./productCtrl")

module.exports.addProductToOrder = (id, prodId, quantity) => {
    return new Promise((resolve, reject) => {
        return getOneProduct(prodId).then(product => {
            if (product.quantity >= quantity) {
                getActiveOrder(id).then(order => {
                    if (order !== undefined) {
                        let ordProdObj = {
                            order_quantity: quantity,
                            order_id: order.order_id,
                            product_id: prodId
                        }
                        postOneOrderProduct(ordProdObj);
                        console.log("Your Order has been updated with your product(s)")
                        ui.displayWelcome();
                    } else {
                        let newOrder = {
                            customer_id: id,
                            payment_type: null
                        }
                        postOneOrder(newOrder).then(postedOrder => {
                            getActiveOrder(id).then(actOrder => {
                                let ordProdObj = {
                                    order_quantity: quantity,
                                    order_id: actOrder.order_id,
                                    product_id: prodId
                                }
                                postOneOrderProduct(ordProdObj);
                                console.log("Your Order has been created!");
                                ui.displayWelcome();
                            });
                        });

                    }
                });
            } else {
                console.log(`I'm sorry but there are only ${product.quantity} items available to be added to your cart, please enter another quantity.`)
                productCtrl.addQuantityPrompt(prodId, id);
            };
        });
    });
};

