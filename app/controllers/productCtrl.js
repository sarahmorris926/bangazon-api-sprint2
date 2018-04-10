const {
  getSumOfProducts,
  getOrder,
  getPaymentMethods,
  updatePaymentMethod,
  getSumOfProdsSQL,
  getAllProducts, 
  postOneProduct, 
  deleteOneProduct, 
  getOneProduct 
} = require("../models/Product.js")
const colors = require("colors/safe");
const {
  red,
  magenta,
  blue
} = require("chalk");

const { displayWelcome } = require('../ui.js');
const prompt = require('prompt');
const { getActiveCustomer } = require('../activeCustomer.js');
const { addProductToOrder } = require('./order_productCtrl');


const ui = require('../ui');

module.exports.completeAPayment = (customerId) => {
  getOrder(customerId).then((orderId) => {
    getSumOfProdsSQL(orderId[0].order_id).then((sum) => {

      if (sum[0]['sum(product.price* product.quantity)'] === 0) {
        console.log("Please add products to your order");
        ui.displayWelcome();

      } else {

        let headerDivider = `${magenta('*********************************************************')}`
        return new Promise((resolve, reject) => {
          console.log(`
      ${headerDivider}
      ${magenta(`** Your Current Order Total is ${sum[0]['sum(product.price* product.quantity)']}, ready to purhase?**`)}
      ${headerDivider}`)
          prompt.get([{
            name: 'choice',
            description: '(Y/N)',
            type: 'string',
            message: "please select Y or N"
          }], function (err, results) {
            if (err) return reject(err);
            if (results.choice === "Y") {
              getPaymentMethods(customerId).then((payment) => {
                if (payment.length === 0) {
                  console.log("please add payments to your account")
                } else {
                  return new Promise((resolve, reject) => {
                    console.log(`${headerDivider}${(`Choose a payment option`)}${headerDivider}`);
                    for (i = 0; i < payment.length; i++) {
                      console.log(`${i+1} . ${payment[i].payment_option}`);
                    };
                    prompt.get([{
                      name: "Choice",
                      description: `enter number of the payment you would like to select`,
                      type: 'integer',
                      message: 'enter number of payment you would like to select'
                    }], function (err, results) {
                      if (err) return reject(err);
                      if (results.Choice === 1) {
                        updatePaymentMethod(payment[0].payment_id, orderId[0].order_id)
                          .then((data) => {
                            console.log("payment completed");
                            ui.displayWelcome();
                          })
                      } else if (results.Choice === 2) {
                        updatePaymentMethod(payment[1].payment_id, orderId[0].order_id)
                          .then((data) => {
                            console.log("payment completed");
                            ui.displayWelcome();
                          })
                      } else if (results.Choice === 3){
                        updatePaymentMethod(payment[2].payment_id, orderId[0].order_id)
                          .then((data) => {
                            console.log("payment completed");
                            ui.displayWelcome();
                          })
                      } else if (results.Choice === 4){
                        updatePaymentMethod(payment[3].payment_id, orderId[0].order_id)
                          .then((data) => {
                            console.log("payment completed");
                            ui.displayWelcome();
                          })
                      } else {
                        updatePaymentMethod(payment[4].payment_id, orderId[0].order_id)
                          .then((data) => {
                            console.log("payment completed");
                            ui.displayWelcome();
                          })
                      }
                    })

                  })

                }
              })
            } else {
              console.log("You chose to not complete your order!");
              ui.displayWelcome();
            }
          });
        });
      }
    })
  })
}


module.exports.promptNewProduct = () => {
    return new Promise((resolve, reject) => {
        prompt.get(
            [
                {
                    name: "product_name",
                    description: "Enter the product name",
                    type: "string",
                    required: true
                },
                {
                    name: "price",
                    description: "Enter the price",
                    type: "integer",
                    required: true,
                    message: "You did not enter a valid price. Please enter a number."
                },
                {
                    name: "description",
                    description: "Description",
                    type: "string",
                    required: true
                },
                {
                    name: "quantity",
                    description: "Quantity",
                    type: "integer",
                    required: true,
                    message: "You did not enter a valid quantity. Please enter a number."
                }
            ],
            function (err, results) {
                if (err) return reject(err);
                results.customer_id = getActiveCustomer().id.choice;
                postOneProduct(results);
                console.log(`Product has been added: ${results.product_name}`)
                // resolve(results);
                ui.displayWelcome();
            }
        );
    });
};

module.exports.promptListAllCustomerProducts = (productData) => {
    let headerDivider = `${magenta('*********************************************************')}`
    return new Promise((resolve, reject) => {
        console.log(`
      ${headerDivider}
      ${magenta("** To Delete a product enter the Product's ID number **")}
      ${headerDivider}

    ${magenta('0.')} Return to Main Menu`
        )
        productData.forEach(product => {
            console.log(`
    Product ID: ${product.product_id} - ${product.product_name}
      `);
        });

        prompt.get([{
            name: 'choice',
            description: 'Please make a selection',
            type: 'integer',
            message: "You did not enter a valid option. Please try again!"
        }], function (err, results) {
            if (err) return reject(err);
            deleteOneProduct(results.choice, getActiveCustomer().id.choice)
        });
    });
}
// Prompt to list all products when 5 is selected
module.exports.promptListAllProducts = (productData) => {
    let headerDivider = `${magenta('*********************************************************')}`
    return new Promise((resolve, reject) => {
        console.log(`
      ${headerDivider}
      ${magenta("** Enter the ID of the Product you wish to add to the Active Customer's Cart **")}
      ${headerDivider}

      ${magenta('0.')} Return to Main Menu`
        )
        productData.forEach(product => {
            console.log(`
    Product ID: ${product.product_id} - ${product.product_name}
      `);
        });
        prompt.get([{
            name: 'choice',
            description: 'Please make a selection',
            type: 'integer',
            minimum: 1,
            maximum: productData.length,
            message: "You did not enter a valid option. Please try again!"
        }], function (err, results) {
            if (err) return reject(err);
// Call back runs the next prompt, which allows users to enter quantity          
            module.exports.addQuantityPrompt(results.choice, getActiveCustomer().id.choice)
        });
    });
}

//Prompt to add the quantity of the product being added to the cart
module.exports.addQuantityPrompt = (prodID, custID) => {
    let headerDivider = `${magenta('*********************************************************')}`
    return new Promise((resolve, reject) => {
        console.log(`
      ${headerDivider}
      ${magenta("** Enter the Quantity you wish to add to the cart **")}
      ${headerDivider}
      ${magenta('0.')} Return to Main Menu`
        )
        console.log(`
    Quantity: 
    `
        )
        prompt.get([{
            name: 'quantity',
            description: 'Please enter the quantity',
            type: 'integer',
            message: "You did not enter a valid option. Please try again!"
        }], function (err, results) {
            if (err) return reject(err);
//runs the function from the OP Ctrl to add the Object to the OP table
            addProductToOrder(custID, prodID, results.quantity)
        });
    })
}