const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bangazon.sqlite");
const { readFileSync } = require("fs");
const { dateGen } = require("../data/dateGenerator");
const faker = require("faker");

const createCustomersTable = require("./customer_table");
const createPaymentTypesTable = require("./payment_type_table");
const createOrdersTable = require("./order_table");
const createProductTypesTable = require("./product_type_table");
const createProductsTable = require("./product_table");
const createProductOrdersTable = require("./order_product_table");


const createTables = () => {
  createCustomersTable();
  setTimeout(createPaymentTypesTable, 2000);
  setTimeout(createOrdersTable, 4000);
  setTimeout(createProductTypesTable, 6000);
  setTimeout(createProductsTable, 8000);
  setTimeout(createProductOrdersTable, 10000);
};
createTables();