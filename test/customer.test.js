const { postOneCustomer } = require("../app/controllers/customerCtrl");
const { postOne } = require("../app/models/Customer.js");
const { assert: { equal, deepEqual, isFunction } } = require("chai");
const { createTables } = require("../db/build_table");

describe("bangazonSprint2", () => {
  before(done => {
    createTables().then(() => {
      done();
    });
  });
});

describe("add customer", () => {
  it("should be a function", () => {
    isFunction(postOne);
  });

  it("should return an object", () => {
    let expected = {};
    return postOne().then(data => {
      deepEqual(data, expected);
    });
  });

  it("should return a new customer id for the new customer added to data", () => {
    let expected = {
      first_name: "Jang",
      last_name: "Dao",
      street: "5 Lovers Lane",
      city: "Romancazania",
      state: "Denmark",
      zip: "56565",
      phone: "333-444-5555"
    };
    return postOne(expected).then(data => {
      console.log("Custdata", data);
      equal(53, data.customer_id);
    });
  });
});