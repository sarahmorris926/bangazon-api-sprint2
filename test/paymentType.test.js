const {
  assert: { equal, deepEqual, isFunction, isObject, isArray }
} = require("chai");
const { postOne } = require("../app/models/PaymentType");
const createPaymentTypeTable = require("../db/payment_type_table");

// post one function
describe("add payment type", () => {
  it("should be a function", () => {
    isFunction(postOne);
  });
  before(done => {
    createPaymentTypeTable().then(() => {
      done();
    });
  });

  it("should return an object", () => {
    let expected = {};
    return postOne(expected).then(data => {
      isObject(data);
    })
  })
});
