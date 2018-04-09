const {
  getSumOfProducts,
  getOrder,
  getPaymentMethods,
  updatePaymentMethod
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
            if (results.choice === "Y"){
              getPaymentMethods(customerId).then((payment)=>{
                return new Promise((resolve, reject)=>{
                  console.log(`${headerDivider}${(`Choose a payment option`)}${headerDivider}`)

                  for (i = 0; i < payment.length; i++){
                    console.log(`${i+1} . ${payment[i].payment_option}`);
                  }
                    prompt.get([{
                      name:"Choice",
                      description: `enter name of payment you would like to select`,
                      type: 'string',
                      message:'enter name of payment you would like to select'
                    }],function (err,results){
                      if (err) return reject(err);
                      updatePaymentMethod(20, 11).then((data) =>{
                        console.log("payment completed");
                      })
                      .catch((err) => {
                        console.log((err), "error in updating payment method");
                      })
                    })
                
                })
              })
              .catch((err) =>{
                console.log(err,"error in getPaymentMethods")
              })
            } else {
              console.log("You chose to not complete your order!")
            }
          });
        });
      })
    })
    .catch((err) => {
      console.log("err", err)
    });
}