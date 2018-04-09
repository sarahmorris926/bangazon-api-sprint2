const {
  assert: { equal, deepEqual, isFunction, isObject, isArray, lengthOf }
} = require("chai");
const {
  postOnePaymentType,
  getCustomerPaymentTypes,
  getCustomerPaymentTypeDuplicates
} = require("../app/models/PaymentType");
const createPaymentTypeTable = require("../db/payment_type_table");
const { getActiveCustomer } = require("../app/activeCustomer");

// post one function
describe("POST one payment type", () => {
  before(done => {
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
      postOnePaymentType(expected)
        .then(data => {
          equal(32, data.payment_id);
        })
        .catch(err => {
          console.log("err 3", err);
        });
    });
  });
});

// Get Customer's Payment Types

describe("get all costumer's payment types", () => {
  describe("get all payment types", () => {
    it("should be an array", () => {
      getCustomerPaymentTypes(1).then(data => {
        isArray(data);
      });
    });

    it("should return an array of objects", () => {
      getCustomerPaymentTypes(1).then(data => {
        isObject(data[0]);
      });
    });
    it("should return the length of the array of total payment types", () => {
      getCustomerPaymentTypes(1).then(data => {
        lengthOf(data, 1);
      });
    });
  });
});

// Get customer's duplicate payment types

describe("get a costumer's duplicate payment type", () => {
  describe("get a duplicate payment type", () => {
    it("should be an array", () => {
      return getCustomerPaymentTypeDuplicates(11, 79913608).then(data => {
        isArray(data);
      });
    });

    it("should return an array of objects", () => {
      return getCustomerPaymentTypeDuplicates(11, 79913608).then(data => {
        isObject(data[0]);
      });
    });
    it("should return the length of the array of total payment types", () => {
      return getCustomerPaymentTypeDuplicates(11, 79913608).then(data => {
        lengthOf(data, 1);
      });
    });
  });
});
