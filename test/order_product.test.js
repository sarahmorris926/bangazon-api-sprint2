
const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const { getAllOrderProducts, postOneOrderProduct, getOneOrderProduct } = require("../app/models/Order_Product")
const createOrderProductTable = require("../db/order_product_table");
// Order_Product Model
// get All Order Products
describe("get order products", () => {
    after(done => {
        createOrderProductTable().then(() => {
            done();
        });
    });
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
            getOneOrderProduct(1).then(op => {
                isObject(op);
            })
        })
        it("should return an object with the correct Line ID", () => {
            getOneOrderProduct(1).then(op => {
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
    it("should return the Line ID of the object posted", () => {
        let newOP = {
            quantity: 10,
            order_id: 5,
            product_id: 6,
            price: 5.00
        }
        postOneOrderProduct(newOP).then(op => {
            console.log(op);
            equal(141, op.line_id);
        })
    })
})

