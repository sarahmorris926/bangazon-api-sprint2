const {
  postOneCustomer,
  promptNewCustomer
} = require("../app/controllers/customerCtrl");
const { postOne, getOne } = require("../app/models/Customer.js");
const {
  assert: { equal, deepEqual, isFunction, isObject, isArray }
} = require("chai");
const createCustomerTable = require("../db/customer_table.js");

// MODEL
// Post One
describe("add customer", () => {
  it("should be a function", () => {
    isFunction(postOne);
  });
  after(done => {
    createCustomerTable().then(() => {
      done();
    });
  });

  it("should return an object", () => {
    let expected = {};
    return postOne(expected).then(data => {
      isObject(data, expected);
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
      equal(52, data.customer_id);
    });
  });
});

// Get One
describe("Get one Customer", () => {
  describe("get one function", () => {
    it("should return an object", () => {
      getOne(50).then(data => {
        isObject(data);
      });
    });
  });
  it("should return the correct Customer Information", () => {
    getOne(50).then(data => {
      deepEqual(50, data.customer_id);
    });
  });
});

// CONTROLLER
// Post One
describe("Add Customer Prompt", () => {
  it("should be a function", () => {
    isFunction(promptNewCustomer);
  });
});
