const {
  getSumOfProducts,
  getOrder
} = require("../models/Product.js")
const prompt = require('prompt');
const colors = require("colors/safe");
const {
  red,
  magenta,
  blue
} = require("chalk");

module.exports.completeAPayment = (customerId) => {
  getOrder(customerId).then((orderId) => {
      console.log(orderId[0].order_id, "order Id");
      getSumOfProducts(orderId[0].order_id).then((sum) => {
        console.log("sum", sum);
        let headerDivider = `${magenta('*********************************************************')}`
        return new Promise((resolve, reject) => {
          console.log(`
    ${headerDivider}
    ${magenta(`** Your Current Order Total is ${sum[0]['sum (price)']}, ready to purhase?**`)}
    ${headerDivider}`)
          prompt.get([{
            name: 'choice',
            description: '(Y/N)',
            type: 'string',
            message: "please select Y or N"
          }], function (err, results) {
            if (err) return reject(err);
            //TODO: select payment types 
          });
        });
      })
    })
    .catch((err) => {
      console.log("err", err)
    });
}