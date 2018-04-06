
const { setActiveCustomer, getActiveCustomer } = require("../activeCustomer");

const {getSumOfProducts} = require("../models/Product.js")


module.exports.completeAPayment = (customerId) => {

  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise( (resolve, reject) => {
    console.log(`
    ${headerDivider}
    ${magenta('** Your Current Order Total is ${sum}, ready to purhase?**')}
    ${headerDivider}`
  )
  prompt.get([{
    name: 'choice',
    description: '(Y/N)',
    type: 'string',
    message: "please select Y or N"
  }], function(err, results) {
    if (err) return reject(err);
    //TODO: select payment types 
  });
  });
}