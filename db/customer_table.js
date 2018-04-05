const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bangazon.sqlite");
const { readFileSync } = require("fs");
const { dateGen } = require("../data/dateGenerator");
const faker = require("faker");
const custData = JSON.parse(readFileSync("./data/customer.json"));

module.exports = () => {
    return new Promise((resolve, reject) => {
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
    phone TEXT
    )`,
                () => {
                    custData.forEach(
                        ({
                            firstName,
                            lastName,
                            addressStreet,
                            addressCity,
                            addressState,
                            addressZip,
                            phone
                        }) => {
                            db.run(`INSERT INTO customer VALUES (
                    ${null},
                    "${firstName}",
                    "${lastName}",
                    "${addressStreet}",
                    "${addressCity}",
                    "${addressState}",
                    "${addressZip}",
                    "${faker.phone.phoneNumberFormat()}"
                    )`);
                        }
                    );
                })
        })
        resolve();
    })
}