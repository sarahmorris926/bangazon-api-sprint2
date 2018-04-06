"use strict";

const { assert: { equal, deepEqual, isFunction, isObject, isArray } } = require("chai");
const { getAllOrders, postOneOrder, getOneOrder } = require("../app/models/Order")
const createOrderTable = require("../db/order_table.js");



// Order Model
// GET Orders
describe("GET All Orders", () => {
    after(done => {
        createOrderTable().then(() => {
            done();
        });
    });
    it("should be a function", () => {
        isFunction(getAllOrders);
    });

    it("should return an array", () => {
        getAllOrders().then(data => {
            isArray(data);
        });
    });

    it("should return an object in array[0]", () => {
        getAllOrders().then(data => {
            isObject(data[0]);
        });
    });
});

describe("GET One Order", () => {
    it("should be a function", () => {
        isFunction(getOneOrder);
    });
    it("should return an object", () => {
        getOneOrder(1).then(order => {
            isObject(order);
        });
    });
    it("should return an object with expected information", () => {
        let expected = {
            order_id: 1,
            customer_id: 1,
            payment_type: null,
            order_creation_date: '2017-04-26'
        }
        getOneOrder(1).then(order => {
            console.log(order);
            equal(order, expected);

        })
            .catch((err) => {
                console.log('error 1', err);
            });
    });
});


// POST Orders
// describe("Post One order", () => {
//     it("should be a function", () => {
//         isFunction(postOneOrder);
//     });
//     it("should return an object equal to the order posted", () => {
//         let newOrder = {
//             customer_id: 21,
//             payment_type: null,
//             order_creation_date: "2018-03-15"
//         }
//         postOneOrder(newOrder).then(postedOrder => {
//             let expected = {
//                 order_id: 46,
//                 customer_id: 21,
//                 payment_type: null,
//                 order_creation_date: "2018-03-20"
//             };
//             console.log(postedOrder);
//             isObject(postedOrder);
//         })
//           .catch((err) => {
//             console.log('error 1', err);
        //    return getOneOrder(46).then(order => {
        //        console.log(order);
        //        deepEqual(order, expected);
        //    });
        // });
    // });
// });
