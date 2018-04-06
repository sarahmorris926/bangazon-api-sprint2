
const { promptNewCustomer } = require("../app/controllers/customerCtrl");
const { postOneCustomer, getOneCustomer, getAllCustomers } = require("../app/models/Customer.js");
const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const createCustomerTable = require("../db/customer_table.js");

// MODEL
// POST One
describe("add customer", () => {
  it("should be a function", () => {
    isFunction(postOneCustomer);
  });
  before(done => {
    createCustomerTable().then(() => {
      done();
    });
  });

  it("should return an object", () => {
    let expected = {};
    return postOneCustomer(expected).then(data => {
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
    return postOneCustomer(newCustomer).then(data => {
      equal(52, data.customer_id);
      return getOneCustomer(data.customer_id).then(customer => {
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
      getOneCustomer(50).then(data => {
        isObject(data);
      });
    });
  });
  it("should return the correct Customer Information", () => {
    getOneCustomer(50).then(data => {
      deepEqual(50, data.customer_id);
    });
  });
});

// GET All Customers
describe("Get all customers", () => {
  describe('get all function', () => {
    it("should be an array", () => {
      getAllCustomers().then(data => {
        isArray(data);
    });
    });
    it("should be an array of objects", () => {
      getAllCustomers().then(data => {
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
