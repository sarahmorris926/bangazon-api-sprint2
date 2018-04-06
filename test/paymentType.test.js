const {
  assert: { equal, deepEqual, isFunction, isObject, isArray }
} = require("chai");
const { postOnePaymentType } = require("../app/models/PaymentType");
const createPaymentTypeTable = require("../db/payment_type_table");

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
    })
  })
});
