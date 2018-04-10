"use strict";

const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const { getAllOrders, postOneOrder, getOneOrder, getActiveOrder } = require("../app/models/Order")
const createOrderTable = require("../db/order_table.js");

const currentDate = () => {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
return today;
};

// Order Model
// GET Orders
describe("Order GETs", () => {
    after(done => {
        createOrderTable().then(() => {
            done();
        });
    });
    describe("GET All Orders", () => {
        it("should be a function", () => {
            isFunction(getAllOrders);
        });

        it("should return an array", () => {
            getAllOrders().then(data => {
                isArray(data);
            });
        });

        it("should return an object in array[0]", () => {
            getAllOrders().then(data => {
                isObject(data[0]);
            });
        });
    });
    describe("GET One Order", () => {
        it("should be a function", () => {
            isFunction(getOneOrder);
        });
        it("should return an object", () => {
            getOneOrder(1).then(order => {
                isObject(order);
            });
        });
        it("should return an object with expected information", () => {
            let expected = {
                order_id: 1
            }
            getOneOrder(1).then(order => {
                equal(order.order_id, expected.order_id);
            })
                .catch((err) => {
                    console.log('error 1', err);
                });
        });
    });
    describe("get the active order for the active customer", () => {
        it("should be a function", () => {
            isFunction(getActiveOrder);
        });
        it ("should return an object", () => {
            getActiveOrder(2).then(order =>{
                isObject(order);
            });
        });
    });
});
// POST Orders
describe("Post One order", () => {
    it("should be a function", () => {
        isFunction(postOneOrder);
    });
    it("should return an object equal to the order posted", () => {
        let newOrder = {
            customer_id: 21,
            payment_type: null
        }
        return postOneOrder(newOrder).then(postedOrder => {
            let expected = {
                order_id: 46,
                customer_id: 21,
                payment_type: null,
                order_creation_date: currentDate()
            };
            return getOneOrder(46).then(order => {
                console.log(order);
                deepEqual(order, expected);
            })
        });
    });
});
