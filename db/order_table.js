const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bangazon.sqlite");
const { readFileSync } = require("fs");
const { dateGen } = require("../data/dateGenerator");
const faker = require("faker");
const custData = JSON.parse(readFileSync("./data/customer.json"));
const paymentTypeData = JSON.parse(readFileSync("./data/payment_type.json"));
const productTypeData = JSON.parse(readFileSync("./data/product_type.json"));
const productData = JSON.parse(readFileSync("./data/product.json"));

module.exports = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS orders`);
            db.run(
                `CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            payment_type INTEGER,
            order_creation_date TEXT,
            FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        )`,
        // FOREIGN KEY (payment_type) REFERENCES payment_type(payment_id) 
                () => {
                    for (let i = 1; i <= 15; i++) {
                        db.run(`INSERT INTO orders VALUES (
                        ${null},
                        ${i},
                        null,
                        "${dateGen("2017-03-20", "2018-03-20")}"
                    )`);
                    }
                    db.all(
                        `SELECT payment_id, customer_id FROM payment_type`,
                        (err, paymentTypes) => {
                            if (err) return reject(err);
                            paymentTypes.forEach(payment => {
                                db.run(`INSERT INTO orders VALUES(
                                ${null},
                                ${payment.customer_id},
                                ${payment.payment_id},
                                "${dateGen("2017-03-20", "2018-03-20")}"
                        )`);
                            });
                        }
                    );
                }
            )
        })
        resolve();
    })
}