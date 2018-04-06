'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");
const {red, magenta, blue} = require("chalk");
const prompt = require('prompt');
const colors = require("colors/safe");
const listCustPro = require('../controllers/productCtrl'); 
const { getActiveCustomer} = require('../activeCustomer');

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

module.exports.getCustomerProducts = (id) => {
    return new Promise( (resolve, reject) => {
        db.all(`SELECT * FROM product WHERE customer_id = ${id}`, (err, customerProducts) => {
            if (err) return reject(err);
            resolve(customerProducts);
        });
    });
}

let getAllOrderProducts = (id) => {
    return new Promise( (resolve, reject) => {
        db.all(`SELECT * FROM order_product WHERE product_id = ${id}`, (err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
}

module.exports.deleteOneProduct = (id) => {
    getAllOrderProducts(id)
    .then(products => {
        console.log("this is passed into IF", products);
        if(products.length < 1) {
            return new Promise( function(resolve, reject) {
                db.run(`DELETE * FROM product WHERE product_id = ${id}`, (err, product) => {
                    if (err) return reject(err);
                    resolve({id: this.lastID});
                });
            });
        } else {
            console.log("The product you selected is either attached to an existing order and can't be deleted, or does not exist. Please try again!");
            module.exports.getCustomerProducts(getActiveCustomer().id.choice)
            .then( (productData) => {
                listCustPro.listAllCustomerProducts(productData);
            });
        }
    });
}



