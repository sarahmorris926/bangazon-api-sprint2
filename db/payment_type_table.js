const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bangazon.sqlite");
const { readFileSync } = require("fs");
const { dateGen } = require("../data/dateGenerator");
const faker = require("faker");
const paymentTypeData = JSON.parse(readFileSync("./data/payment_type.json"));

module.exports = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS payment_type`);
            db.run(
                `CREATE TABLE IF NOT EXISTS payment_type (
            payment_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            payment_option TEXT,
            account_number INTEGER
        )`,
                () => {
                    paymentTypeData.forEach(
                        ({ customerId, paymentOption, accountNumber }) => {
                            db.run(`INSERT INTO payment_type VALUES(
                        ${null},
                        ${customerId},
                        "${paymentOption}",
                        ${accountNumber}
                    )`);
                        }
                    );
                }
            )
        })
        resolve();
    })
}