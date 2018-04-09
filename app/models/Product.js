'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");



module.exports.postOneProduct = ({product_name, product_type, price, description, customer_id, listing_date, quantity}) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO product VALUES(${null}, "${product_name}", "${product_type}", "${price}", "${description}", "${customer_id}", "${listing_date}", "${quantity}")`, function(err, prod) {
            if (err) return reject(err);
            resolve({product_id: this.lastID});
        });
    });
};

module.exports.getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM product
                WHERE product.product_id = ${id}`, (err, product) => {
                    if (err) return reject(err);
                    resolve(product);
                });
    });
};


module.exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM product`, (err, prods) => {
            if (err) return reject(err);
            resolve(prods);
        });
    });
};

//CB add a get order call to select active order for active customer i.e where payment_type is null 

module.exports.getActiveOrder = (customerId) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT order_id FROM orders where customer_id = ${customerId} and payment_type is NULL`, (err, orderId) => {
            if (err) return reject(err);
            resolve(orderId);
        });
    });
};

module.exports.getOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM orders where order_id = ${orderId}`, (err, orderId) => {
            if (err) return reject(err);
            resolve(orderId);
        });
    }); 
}
//cb add call to sum the products from order_products using the orderId from the active customer

module.exports.getSumOfProducts = (orderId) =>{
    return new Promise ((resolve,reject) => {
        db.all(`SELECT sum (price) from order_product where order_id = ${orderId}`,(err,sum) =>{
            if (err) return reject(err);
            resolve(sum)
        })
    })
};

module.exports.getPaymentMethods = (customerId) => {
    return new Promise ((resolve,reject) => {
        db.all(`SELECT payment_option from payment_type where customer_id = ${customerId}`, (err,sum) =>{
            if (err) return reject(err);
            resolve(sum)
        })
    })
};

module.exports.updatePaymentMethod = (payment,orderId) => {
    return new Promise ((resolve,reject) => {
        db.all(`UPDATE orders set payment_type =  ${payment} where order_id = ${orderId}`, (err,result) =>{
            if (err) return reject(err);
            resolve(this.lastID)
        })
    })
};

