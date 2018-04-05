const { assert: { isFunction, isObject, deepEqual, equal } } = require("chai");
const { postOne, getOne } = require("../app/models/Product.js");
const createProductTable = require('../db/product_table.js');

// MODEL
// Post One
describe("POST One Customer", () => {
    describe("add a product", () => {
      it("should be a function", () => {
        isFunction(postOne);
      });
      before(done => {
        createProductTable().then(() => {
            done();
        });
      });
      it("should return an object", () => {
          let expected = {};
          return postOne(expected).then(data => {
              isObject(data, expected);
          }); 
      });

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
