const { assert: { isFunction, isObject, deepEqual, equal, isArray, lengthOf, isNumber } } = require("chai");
const { postOneProduct, getOneProduct, getAllProducts, getOrder, getSumOfProducts } = require("../app/models/Product.js");
const createProductTable = require('../db/product_table.js');

// MODEL
// Post One
describe.skip ("POST One Product", () => {
    after(done => {
      createProductTable().then(() => {
          done();
      })
      .catch((err) => {
        console.log('error error error', err);
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
      it("should return an object", () => {
          postOneProduct(expected).then(data => {
              isObject(data);
          })
          .catch((err) => {
            console.log('error 1', err);
          })
      });
      it("should return a new product id for the newly added product", () => {
          postOneProduct(expected).then(data => {
              equal(152, data.product_id);
          })
          .catch((err) => {
            console.log('error 2', err);
          })
      })

    });
});

// GET One
describe.skip("GET One Product", () => {
    describe("get a product", () => {
        it("should return an object", () => {
            getOneProduct(1).then(data => {
                isObject(data);
            });
        });
        it("should return the correct Product object", () => {
            return getOneProduct(1).then(data => {
                let expected = {
                    product_id: 1,
                    product_name: "Fantastic Cotton Fish",
                    product_type: 3,
                    price: "800",
                    description: "I'll generate the optical IB bus, that should firewall the XML panel!",
                    customer_id: 19,
                    listing_date: "2017-04-02",
                    quantity: 46
                };
                equal(1, data.product_id);
            });
        });
    });
});

// GET All
describe.skip("GET All Products", () => {
    describe("get all products", () => {
        it("should be an array", () => {
            getAllProducts().then(data => {
                isArray(data);
            });
        });
        it("should be an array of objects", () => {
            getAllProducts().then(data => {
                isObject(data[1]);
            });
        });
        it("should return the length of array of total products", () => {
            getAllProducts().then(data => {
                lengthOf(data, 152);
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

describe("Get sum", () =>{

    it ("Should be an integer",()=>{
        getSumOfProducts(43).then(data =>{
            isNumber(data[0]['sum (price)']);
        })
        .catch((err)=>{
            console.log(err, "sum test error");
        })
    })
})