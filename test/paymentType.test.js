const {
  assert: { equal, deepEqual, isFunction, isObject, isArray }
} = require("chai");
const { postOnePaymentType } = require("../app/models/PaymentType");
const createPaymentTypeTable = require("../db/payment_type_table");
const { getActiveCustomer } = require("../app/activeCustomer");

// post one function
describe("POST one payment type", () => {
  after(done => {
    createPaymentTypeTable()
      .then(() => {
        done();
      })
      .catch(err => {
        console.log("err 1", err);
      });
  });
  describe("add payment type", () => {
    let expected = {
      customer_id: 1,
      payment_option: "Free Cheeseburger Coupon",
      account_number: "Voucher"
    };

    it("should be a function", () => {
      isFunction(postOnePaymentType);
    });

    it("should return an object", () => {
      let expected = {};
      return postOnePaymentType(expected)
        .then(data => {
          isObject(data);
        })
        .catch(err => {
          console.log("err 2", err);
        });
    });

    it("should return new payment type id for the payment type added to table", () => {
      postOnePaymentType(expected).then(data => {
        equal(31, data.payment_id);
      })
      .catch(err => {
        console.log("err 3", err);
      });
    });
  });
});

// Get Customer's Payment Types

// Get customer's duplicate payment types


