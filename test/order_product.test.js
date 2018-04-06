
const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const { getAllOrderProducts } = require("../app/models/Order_Product")

// Order_Product Model
// get All Order Products
describe("get order products", () => {
    describe("get all order products", () => {
        it("should be a function", () => {
            isFunction(getAllOrderProducts);
        });

        it("should return an array", () => {
            console.log("hello");
            getAllOrderProducts().then(data => {
                isArray(data);
            });
        });

        it("should be an object in the 0 index of the array", () => {
            getAllOrderProducts().then(data => {
                isObject(data[0]);
            })
        })
    });
});

