const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bangazon.sqlite");
const { readFileSync } = require("fs");
const { dateGen } = require("../data/dateGenerator");
const faker = require("faker");
const productData = JSON.parse(readFileSync("./data/product.json"));

module.exports = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS product`);
            db.run(
                `CREATE TABLE IF NOT EXISTS product (
            product_id INTEGER PRIMARY KEY,
            product_name TEXT,
            product_type INTEGER,
            price INTEGER,
            description TEXT,
            customer_id INTEGER,
            listing_date TEXT,
            quantity INTEGER
        )`,
                () => {
                    productData.forEach(
                        ({
                            productName,
                            productType,
                            price,
                            description,
                            customerId,
                            dateCreated,
                            quantity
                        }) => {
                            db.run(`INSERT INTO product VALUES(
                        ${null},
                        "${productName}",
                        ${productType},
                        ${price},
                        "${description}",
                        ${customerId},
                        "${dateGen("2017-03-20", "2018-03-20")}",
                        ${faker.random.number({ min: 1, max: 120 })}
                    )`);
                        }
                    );
                }
            )
        })
        resolve();
    })
}