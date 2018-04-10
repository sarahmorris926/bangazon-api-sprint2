
const { assert: { isFunction, isObject, deepEqual, equal, isArray, lengthOf, isNumber } } = require("chai");
const { postOneProduct, getOneProduct, getAllProducts, deleteOneProduct, getCustomerProducts, getAllOrderProducts, updateProductQuantity, getActiveOrder, getSumOfProducts, getOrder, getPaymentMethods, updatePaymentMethod, getProductsList, getPriceAndQuantity, getSumOfProdsSQL } = require("../app/models/Product.js");
const { getActiveCustomer, setActiveCustomer } = require('../app/activeCustomer');
const { promptNewProduct } = require('../app/controllers/productCtrl');
const createProductTable = require('../db/product_table.js');


// MODEL
// Post One
describe("POST One Product", () => {
    before(done => {
        createProductTable().then(() => {
            done();
        })
            .catch((err) => {
                console.log('error in product test 1', err);
            })
    });
    describe("add a product", () => {
        let expected = {
            product_name: "Hershey's Chocolate",
            product_type: 1,
            price: "10",
            description: "Delicious chocolate from the gods",
            customer_id: 1,
            listing_date: "2018-01-01",
            quantity: 100
        }
        it("should be a function", () => {
            isFunction(postOneProduct);
        });
        it("should return an object, and should return the new product ID for newly added product", () => {
            return postOneProduct(expected).then(data => {
                getOneProduct(data.product_id)
                    .then(newData => {
                        isObject(newData);
                        equal(151, newData.product_id);
                    })
            })
                .catch((err) => {
                    console.log('error 1', err);
                })
        });
    });
});

// GET One
describe("GET One Product", () => {
    describe("get a product", () => {
        it("should return an object", () => {
            return getOneProduct(1).then(data => {
                isObject(data);
            })
                .catch((err) => {
                    console.log('error 1', err);
                })
        });
        it("should return the correct Product object", () => {
            return getOneProduct(1).then(data => {
                let expected = {
                    product_id: 1
                };
                equal(1, data.product_id);
            })
                .catch((err) => {
                    console.log('correct object error', err);
                });
        });
    });
});

// GET All
describe("GET All Products", () => {
    describe("get all products", () => {
        it("should be an array", () => {
            return getAllProducts().then(data => {
                isArray(data);
            });
        });
        it("should be an array of objects", () => {
            return getAllProducts().then(data => {
                isObject(data[1]);
            });
        });
        it("should return the length of array of total products", () => {
            return getAllProducts().then(data => {
                lengthOf(data, 151);
            });
        });
    });
});

// CONTROLLER


describe("Get order", () =>{
    it ("Should be an object",()=>{
        getOrder(12).then(data => {
            isObject(data[0]);
        })
        .catch((err) => 
        console.log(err,"error"));
    })
})



describe("Get sum SQL", () =>{

    it ("Should be an integer",()=>{
        getSumOfProdsSQL(11).then(data =>{
            isNumber(data[0]['sum(product.price * order_product.order_quantity)']);
        })
        .catch((err)=>{
            console.log(err, "sum test error");
        })
    })
})

//passing in customerID of 11 

describe("get payment methods", () =>{
    it("Should be an array",() =>{
        getPaymentMethods(11).then(data => {
            isArray(data);
        })
        .catch((err) =>{
            console.log(err,"array test error");
        })
    })
    it("Should contain an object", () =>{
        getPaymentMethods(11).then(data => {
            isObject(data[0])
        })
        .catch((err) => {
            console.log(err, "array does not contain object")
        })
    })
})


describe("update payment methods", () =>{
    it("should update the updated payment", ()=>{
        updatePaymentMethod (20, 11).then(data => {
            getOrder(11).then(data =>{
                equal(data[0].payment_type, 20)
            })
        })
        .catch((err) =>{
            console.log(err, "post data method error")
        })
    })
})


describe("Get products and quantity", ()=>{
    it("Should return the price and quantities associated",()=>{
        getPriceAndQuantity(24).then(data =>{
            isArray(data)
        })
        .catch((err)=>{
            console.log(err, "get price and quantities error")
        })
    })
})
describe("Add Product Prompt", () => {
    it("should be a function", () => {
        isFunction(promptNewProduct);
    });
});

// GET ALL CUSTOMERS PRODUCTS
describe("GET All Customers Products", () => {
    describe("get customers products", () => {
        it("should be an array", () => {
            getCustomerProducts(1).then(data => {
                isArray(data);
            });
            it("should be an array of objects", () => {
                getCustomerProducts(1).then(data => {
                    isObject(data[1]);
                });
            });
            it("should contain products with the correct customer id", () => {
                getCustomerProducts(2).then(data => {
                    equal(2, data[1].customer_id);
                });
            });
        });
    });
});

// DELETE ONE PRODUCT
describe("REMOVE One Product", () => {
    describe("delete one product", () => {
        it("should be a function", () => {
            isFunction(deleteOneProduct);
        });
        it("should delete a product", () => {
            deleteOneProduct(151, 1)
                .then(() => {
                    return getOneProduct(151)
                        .then(product151 => {
                            equal(0, product151.length);
                        });
                });
        });
    });
});



