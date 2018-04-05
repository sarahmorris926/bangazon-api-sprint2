const { assert: { isFunction, isObject } } = require("chai");
const { postOne } = require("../app/models/Product.js");
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

// CONTROLLER
