const { postOneCustomer } = require("../app/controllers/customerCtrl");
const { postOne } = require('../app/models/Customer.js');
const { assert: { equal, isFunction } } = require("chai");

// Model Tests

describe("add customer", () => {
  it("should be a function", () => {
    isFunction(postOne);
  });
});

// Controller Tests

// describe("add customer", () => {
//   it("should be a function", () => {
//     isFunction(postOneCustomer);
//   });
// });

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
