
const { assert: { equal, deepEqual, isFunction, isObject, isArray, isNumber } } = require("chai");
const { getAllOrderProducts, postOneOrderProduct, getOneOrderProduct, getLastOrderProduct } = require("../app/models/Order_Product");
const { addProductToOrder } = require("../app/controllers/order_productCtrl");
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
            })
            .catch((err) => {
                console.log('Get All Order Products Should Return an Array', err);
            });
        });

        it("should be an object in the 0 index of the array", () => {
            getAllOrderProducts().then(data => {
                isObject(data[0]);
            })
            .catch((err) => {
                console.log('Get All Order Products Should be an object in the 0 index of the array', err);
            });
        });
    });
    describe("get one order product", () => {
        it("should be a function", () => {
            isFunction(getOneOrderProduct)
        });
        it("should return an object", () => {
            getOneOrderProduct(1).then(op => {
                isObject(op);
            })
            .catch((err) => {
                console.log('Get One Order Product Should Return an object', err);
            });
        });
        it("should return an object with the correct Line ID", () => {
            getOneOrderProduct(1).then(op => {
                equal(1, op.line_id)
            })
            .catch((err) => {
                console.log('Get One Order Product Should Return an object with the correct Line Id', err);
            });
        });
    });
    describe("Get last Line ID on Order Product Table", () => {
        it("should be a function", () => {
            isFunction(getLastOrderProduct)
        });
        it("should return an integer", () => {
            getLastOrderProduct().then(op => {
                isNumber(op);
            })
            .catch((err) => {
                console.log('Get last Line ID Should Return an Integer', err);
            });
        });
    });
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
    });
    it("should return the Line ID of the object posted", () => {
        postOneOrderProduct(newOP).then(op => {
            equal(141, op.line_id);
        })
        .catch((err) => {
            console.log('Post Post Order Product Should Return the Line ID of the object posted', err);
        });
    });
    it("should return the object posted when called by the Line ID", () => {
        let expected = {
            line_id: 141,
            order_id: 5,
            product_id: 6,
            price: 5,
            quantity: 10
        }
        return postOneOrderProduct(newOP).then(op => {
            return getOneOrderProduct(141).then(postedObj => {
                deepEqual(postedObj, expected);
            })
            .catch((err) => {
                console.log('Post One Order Products Should Return the expected object', err);
            });
        });
    });
});

// Order Product Ctrl
describe("Final Order Product Function", () => {
    it("should return an object", () => {
        addProductToOrder(25, 2, 100).then(product => {
            isObject(product);
        })
            .catch((err) => {
                console.log('Final Order Product Function should return an object', err);
            });
    })
    it("should add an object to the table that can be queried", () => {
        let expected = {
            line_id: 142,
            order_quantity: 5,
            order_id: 40,
            product_id: 10
        };
        addProductToOrder(40, 10, 5).then(product => {
            getLastOrderProduct().then(id => {
                getOneOrderProduct(id).then(orderProduct => {
                    deepEqual(orderProduct, expected);
                })
            })
        })
            .catch((err) => {
                console.log('Final Order Product Function Should return the expected object', err);
            });
    })
})




