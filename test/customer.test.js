
const { postOneCustomer, promptNewCustomer } = require("../app/controllers/customerCtrl");
const { postOne, getOne, getAll } = require("../app/models/Customer.js");
const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const createCustomerTable = require("../db/customer_table.js");

// MODEL
// POST One
describe("add customer", () => {
  it("should be a function", () => {
    isFunction(postOne);
  });
  before(done => {
    createCustomerTable().then(() => {
      done();
    });
  });

  it("should return an object", () => {
    let expected = {};
    return postOne(expected).then(data => {
      isObject(data);
    });
  });

  it("should return a new customer id for the new customer added to data", () => {
    let newCustomer = {
      first_name: "Jang",
      last_name: "Dao",
      street: "5 Lovers Lane",
      city: "Romancazania",
      state: "Denmark",
      zip: "56565",
      phone: "333-444-5555"
    };
    return postOne(newCustomer).then(data => {
      equal(52, data.customer_id);
      return getOne(data.customer_id).then(customer => {
        let expected = {
          customer_id: 52,
          first_name: "Jang",
          last_name: "Dao",
          address_street: "5 Lovers Lane",
          address_city: "Romancazania",
          address_state: "Denmark",
          address_zip: "56565",
          phone: "333-444-5555"
        }
        deepEqual(customer, expected);
      })
    });
  });
});

// GET One
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

// GET All Customers
describe("Get all customers", () => {
  describe('get all function', () => {
    it("should be an array", () => {
      getAll().then(data => {
        isArray(data);
    });
    });
    it("should be an array of objects", () => {
      getAll().then(data => {
        isObject(data[1]);
      });
    });
  });
});


// CONTROLLER
// POST One
describe("Add Customer Prompt", () => {
  it("should be a function", () => {
    isFunction(promptNewCustomer);
  });
});
