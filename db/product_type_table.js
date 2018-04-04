const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bangazon.sqlite");
const { readFileSync } = require("fs");
const { dateGen } = require("../data/dateGenerator");
const faker = require("faker");
const productTypeData = JSON.parse(readFileSync("./data/product_type.json"));

module.exports = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS product_type`);
            db.run(
                `CREATE TABLE IF NOT EXISTS product_type (
            product_type_id INTEGER PRIMARY KEY,
            product_type_name TEXT
        )`,
                () => {
                    productTypeData.productTypes.forEach(
                        ({ product_type }) => {
                            db.run(`INSERT INTO product_type VALUES(
                        ${null},
                        "${product_type}"
                    )`);
                        }
                    );
                }
            )
        })
        resolve();
    })
};