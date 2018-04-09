
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
            db.run(`DROP TABLE IF EXISTS order_product`);
            db.run(
                `CREATE TABLE IF NOT EXISTS order_product (
        line_id INTEGER,
        order_quantity INTERGER,
        order_id INTEGER,
        product_id INTEGER
    )`,
                () => {
                    for (let i = 1; i <= 140; i++) {
                        db.run(`INSERT INTO order_product VALUES (
                        ${i},
                        1,
                        ${faker.random.number({ min: 1, max: 45 })},
                        ${faker.random.number({ min: 1, max: 11 })},
                )`);
                    }
                }
            );
        });
        resolve();
    });
};