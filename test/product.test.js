const { assert: { isFunction, isObject, deepEqual, equal } } = require("chai");
const { postOne, getOne } = require("../app/models/Product.js");
const createProductTable = require('../db/product_table.js');

// MODEL
// Post One
describe("POST One Product", () => {
    after(done => {
      createProductTable().then(() => {
          done();
      });
    });
    describe("add a product", () => {
      it("should be a function", () => {
        isFunction(postOne);
      });
      it("should return an object", () => {
          let expected = {};
          return postOne(expected).then(data => {
              isObject(data, expected);
          }); 
      });
      it("should return a new product id for the newly added product", () => {
          let expected = {
            product_name: "Hershey's Chocolate",
            product_type: 1,
            price: "10",
            description: "Delicious chocolate from the gods",
            customer_id: 1,
            listing_date: "2018-01-01",
            quantity: 100
          }
          return postOne(expected).then(data => {
              equal(152, data.product_id);
          })
      })

    });
});

// GET One
describe("GET One Customer", () => {
    describe("get a product", () => {
        it("should return an object", () => {
            getOne(1).then(data => {
                isObject(data);
            });
        });
        it("should return the correct Product object", () => {
            return getOne(1).then(data => {
                let expected = {
                    product_id: 1,
                    product_name: "Fantastic Cotton Fish",
                    product_type: 3,
                    price: "800",
                    description: "I'll generate the optical IB bus, that should firewall the XML panel!",
                    customer_id: 19,
                    listing_date: "2017-04-02",
                    quantity: 54
                };
                equal(1, data.product_id);
            });
        });
    });
});

// CONTROLLER
