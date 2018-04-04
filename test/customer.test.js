const { postOneCustomer } = require("../app/controllers/customerCtrl");
const { postOne } = require("../app/models/Customer.js");
const { assert: { equal, deepEqual, isFunction } } = require("chai");
const { createTables } = require("../db/build_table");

// Model Tests

// describe("bangazonSprint2", () => {
//   beforeEach(done => {
//     createTables().then(() => {
//       done();
//     });
//   });
// });

describe("add customer", () => {
  beforeEach(done => {
    createTables().then(() => {
      done();
    });
  });
  it("should be a function", () => {
    isFunction(postOne);
  });

  it("should return an object", () => {
    let expected = {};
    return postOne().then(data => {
      console.log("Custdata", data);
      deepEqual(data, expected);
    });
  });
});

// Controller Tests

// describe("add customer", () => {
//   it("should be a function", () => {
//     isFunction(postOneCustomer);
//   });
// });

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
