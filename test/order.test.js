"use strict";

const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const { getAllOrders, postOneOrder, getOneOrder } = require("../app/models/Order")


// Order Model
// GET Orders
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
            console.log(order);
            isObject(order);
        });
    });
    it("should return an object with expected information", () => {
        let expected = {
            order_id: 1,
            customer_id: 1,
            payment_type: null,
            order_creation_date: '2017-04-26'
        }
        getOneOrder(1).then(order => {
            deepEqual(order, expected);
        });
    });
});


// POST Orders
describe("Post One order", () => {
    it("should be a function", () => {
        isFunction(postOneOrder);
    });
    it("should return")
});
