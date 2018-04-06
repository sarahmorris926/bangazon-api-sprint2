const {
  assert: { equal, deepEqual, isFunction, isObject, isArray }
} = require("chai");
const { postOnePaymentType } = require("../app/models/PaymentType");
const createPaymentTypeTable = require("../db/payment_type_table");
const { getActiveCustomer } = require('../app/activeCustomer');

// post one function
describe("add payment type", () => {
  it("should be a function", () => {
    isFunction(postOnePaymentType);
  });
  before(done => {
    createPaymentTypeTable().then(() => {
      done();
    });
  });

  it("should return an object", () => {
    let expected = {};
    return postOnePaymentType(expected).then(data => {
      isObject(data);
    });
  });

  it("should return customer id of active customer for new payment type added to data", () => {
    let newPaymentType = {
      customer_id: "",
      payment_option: "Free Cheeseburger Coupon",
      account_number: "Voucher"
    };
    return postOnePaymentType(paymentType).then(data => {
      equal(23, data.customer_id).then(paymentType => {
        let expected = {
          customer_id: 23,
          payment_option: "Free Cheeseburger Coupon",
          account_number: "Voucher"
        };
        deepEqual(paymentType, expected);
      });
    });
  });
});

// Get All Payment Types

// Get Customer's Payment Types
