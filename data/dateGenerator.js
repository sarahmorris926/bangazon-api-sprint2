"use strict";

const faker = require('faker');

module.exports.dateGen = (start, end) => faker.date.between(start, end).toISOString().split('T')[0];