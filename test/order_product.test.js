
const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const { getAllOrderProducts, postOneOrderProduct, getOneOrderProduct } = require("../app/models/Order_Product")

// Order_Product Model
// get All Order Products
describe("get order products", () => {
    describe("get all order products", () => {
        it("should be a function", () => {
            isFunction(getAllOrderProducts);
        });

        it("should return an array", () => {
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
    describe("get one order product", () => {
        it("should be a function", () => {
            isFunction(getOneOrderProduct)
        })
        it("should return an object", () => {
            getOneOrderProduct(1).then(op =>{
                isObject(op);
            })
        })
        it("should return an object with the correct Line ID", () => {
            getOneOrderProduct(1).then(op => {
                console.log(op);
                equal(1, op.line_id)
            })
        })
    })
});

//POST New Order Product
describe("post one order proudct", () => {
    it("should be a function", () => {
        isFunction(postOneOrderProduct);
    })
})

