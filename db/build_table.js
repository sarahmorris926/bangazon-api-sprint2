const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');
const { readFileSync } = require('fs');
const {dateGen} = require('../data/dateGenerator');
const faker = require('faker');

const custData = JSON.parse(readFileSync("./data/customer.json"));
const paymentTypeData = JSON.parse(readFileSync("./data/payment_type.json"));
const productTypeData = JSON.parse(readFileSync("./data/product_type.json"));
const productData = JSON.parse(readFileSync("./data/product.json"));

// const date = dateGen('2017-03-20', '2018-03-20');


db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS customer`);
    db.run(
        `CREATE TABLE IF NOT EXISTS customer (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    address_street TEXT,
    address_city TEXT,
    address_state TEXT,
    address_zip TEXT,
    account_creation_date TEXT
    )`,
        () => {
            custData.forEach(({ firstName, lastName, addressStreet, addressCity, addressState, addressZip, accountCreationDate }) => {
                db.run(`INSERT INTO customer VALUES (
                    ${null},
                    "${firstName}",
                    "${lastName}",
                    "${addressStreet}",
                    "${addressCity}",
                    "${addressState}",
                    "${addressZip}",
                    "${accountCreationDate}"
                    )`);
            });
        }
    );
    db.run(`DROP TABLE IF EXISTS product_type`);
    db.run(
        `CREATE TABLE IF NOT EXISTS product_type (
            product_type_id INTEGER PRIMARY KEY,
            product_type_name TEXT
        )`,
        () => {
            productTypeData.productTypes.forEach(({ product_type, product_id }) => {
                db.run(`INSERT INTO product_type VALUES(
                        ${product_id},
                        "${product_type}"
                    )`);
            });
        });
    db.run(`DROP TABLE IF EXISTS payment_type`)
    db.run(
        `CREATE TABLE IF NOT EXISTS payment_type (
            payment_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            payment_option TEXT,
            account_number INTEGER
        )`,
        () => {
            paymentTypeData.forEach(({ customerId, paymentOption, accountNumber }) => {
                db.run(`INSERT INTO payment_type VALUES(
                        ${null},
                        ${customerId},
                        "${paymentOption}",
                        ${accountNumber}
                    )`);
            });
        });
    db.run(`DROP TABLE IF EXISTS product`)
    db.run(
        `CREATE TABLE IF NOT EXISTS product (
            product_id INTEGER PRIMARY KEY,
            product_name TEXT,
            product_type INTEGER,
            price INTEGER,
            description TEXT,
            customer_id INTEGER,
            listing_date TEXT
        )`,
        () => {
            productData.forEach(({ productName, productType, price, description, customerId, dateCreated }) => {
                db.run(`INSERT INTO product VALUES(
                        ${null},
                        "${productName}",
                        ${productType},
                        ${price},
                        "${description}",
                        ${customerId},
                        "${dateCreated}"
                    )`);
            });
        });
    db.run(`DROP TABLE IF EXISTS orders`);
    db.run(
        `CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            payment_type INTEGER,
            order_creation_date TEXT,
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
            FOREIGN KEY (payment_type) REFERENCES payment_type(payment_id) 
        )`,
        () => {
            for (let i = 1; i <= 15; i++) {
                db.run(`INSERT INTO orders VALUES (
                        ${null},
                        ${i},
                        null,
                        "${dateGen('2017-03-20', '2018-03-20')}"
                    )`);
            }
            db.all(`SELECT payment_id, customer_id FROM payment_type`,
                (err, paymentTypes) => {
                    if (err) return reject(err);
                    paymentTypes.forEach(payment => {
                        db.run(`INSERT INTO orders VALUES(
                                ${null},
                                ${payment.customer_id},
                                ${payment.payment_id},
                                "${dateGen('2017-03-20', '2018-03-20')}"
                        )`);
                    });
                });
        }
    );
    db.run(`DROP TABLE IF EXISTS order_product`);
    db.run(`CREATE TABLE IF NOT EXISTS order_product (
        line_id INTEGER,
        order_id INTEGER,
        product_id INTEGER
    )`,
        () => {
            for (let i = 1; i <= 140; i++) {
                db.run(`INSERT INTO order_product VALUES (
                        ${i},
                        ${faker.random.number({ min: 1, max: 45 })},
                        ${faker.random.number({ min: 1, max: 120 })}
                )`);
            }
        });
});