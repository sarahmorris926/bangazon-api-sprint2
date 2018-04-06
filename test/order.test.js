"use strict";

const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const { getAllOrders } = require("../app/models/Order")


// Order Model
// GET Orders
describe("get orders", () => {
    describe("get all orders", () => {
        it("should be a function", () => {
            isFunction(getAllOrders);
        });

        it("should return an array", () => {
            getAllOrders().then(data => {
                isArray(data);
            });
        });
    });
});