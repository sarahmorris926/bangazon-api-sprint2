
const { assert: { equal, deepEqual, isFunction, isObject, isArray, isNumber } } = require("chai");
const { getAllOrderProducts, postOneOrderProduct, getOneOrderProduct } = require("../app/models/Order_Product")
const { postOrderProductWithId } = require("../app/controllers/order_productCtrl")
const createOrderProductTable = require("../db/order_product_table");


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
    after(done => {
        createOrderProductTable().then(() => {
            done();
        });
    });
    let newOP = {
        quantity: 10,
        order_id: 5,
        product_id: 6,
        price: 5
    }
    it("should be a function", () => {
        isFunction(postOneOrderProduct);
    })
    // it("should return the Line ID of the object posted", () => {
    //     postOneOrderProduct(newOP).then(op => {
    //         equal(141, op.line_id);
    //     })
    // })
    // it("should return the object posted when called by the Line ID", () =>{
    //     let expected = {
    //         line_id: 142,
    //         order_id: 5,
    //         product_id: 6,
    //         price: 5
    //     }
    //     return postOneOrderProduct(newOP).then(op => {
    //         console.log(op.line_id);
    //        return getOneOrderProduct(142).then(postedObj => {
    //             console.log(postedObj);
    //             deepEqual(postedObj, expected);
    //         })
    //     })
    // })
})

// Order Product CTRL Functions
// GET All to POST One
describe("Get last Line ID on Order Product Table", () => {
    it("should be a function", () => {
        isFunction(postOrderProductWithId)
    }) 
    it("should return an integer", () => {
        postOrderProductWithId().then(op => {
            console.log(op);
            isNumber(op);
        })
    })
})
