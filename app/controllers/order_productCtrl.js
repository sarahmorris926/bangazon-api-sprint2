"use strict";

const prompt = require("prompt");
const { getAllOrderProducts, postOneOrderProduct } = require("../models/Order_Product")
const { getActiveOrder, postOneOrder } = require("../models/Order")
const { getAllProducts } = require("../models/Product")
const { getOneProduct } = require("../models/Product")
const ui = require("../ui")
const productCtrl = require("./productCtrl")

//Full function that will add an object to the Order Prod table
module.exports.addProductToOrder = (id, prodId, quantity) => {
    return new Promise((resolve, reject) => {
        return getOneProduct(prodId).then(product => {
            if (product === undefined){
                getAllProducts().then(prodData => {
                    productCtrl.promptListAllProducts(prodData);
                    console.log("Please select an Product ID that actually exists");
                })
//Checks product quantity VS number entered by user        
            } else if (product.quantity >= quantity) {
                getActiveOrder(id).then(order => {
//Checks to see if an active order exists, adds product
                    if (order !== undefined) {
                        let ordProdObj = {
                            order_quantity: quantity,
                            order_id: order.order_id,
                            product_id: prodId
                        };
                        postOneOrderProduct(ordProdObj);
                        console.log("Your Order has been updated with your product(s)");
                        ui.displayWelcome();
                    } else {
//Creates new active order if none exist,  then adds product
                        let newOrder = {
                            customer_id: id,
                            payment_type: null
                        };
                        postOneOrder(newOrder).then(postedOrder => {
                            getActiveOrder(id).then(actOrder => {
                                let ordProdObj = {
                                    order_quantity: quantity,
                                    order_id: actOrder.order_id,
                                    product_id: prodId
                                };
                                postOneOrderProduct(ordProdObj);
                                console.log("Your Order has been created!");
                                ui.displayWelcome();
                            });
                        });
                    };
                });
            } else {
//if quantity is higher than product quantity, returns to quantity prompt
                console.log(`I'm sorry but there are only ${product.quantity} items available to be added to your cart, please enter another quantity.`)
                productCtrl.addQuantityPrompt(prodId, id);
            };
        });
    });
};

