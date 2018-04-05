'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./bangazon.sqlite");

module.exports.postOne = () => {
    return new Promise((resolve, reject) => {
        resolve({});
    })
}
