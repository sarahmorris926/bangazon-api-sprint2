
const { assert: { isFunction, isObject, deepEqual, equal, isArray, lengthOf } } = require("chai");
const { postOneProduct, getOneProduct, getAllProducts } = require("../app/models/Product.js");
const { promptNewProduct } = require('../app/controllers/productCtrl');
const { setActiveCustomer, getActiveCustomer } = require('../app/activeCustomer');
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
            });
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

describe("Add Product Prompt", () => {
    it("should be a function", () => {
      isFunction(promptNewProduct);
    });
  });