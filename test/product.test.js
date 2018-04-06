// const { assert: { isFunction, isObject, deepEqual, equal, isArray, lengthOf } } = require("chai");
// const { postOne, getOne, getAll } = require("../app/models/Product.js");
// const createProductTable = require('../db/product_table.js');

// // MODEL
// // Post One
// describe("POST One Product", () => {
//     after(done => {
//       createProductTable().then(() => {
//           done();
//       })
//       .catch((err) => {
//         console.log('error error error', err);
//       })
//     });
//     describe("add a product", () => {
//         let expected = {
//             product_name: "Hershey's Chocolate",
//             product_type: 1,
//             price: "10",
//             description: "Delicious chocolate from the gods",
//             customer_id: 1,
//             listing_date: "2018-01-01",
//             quantity: 100
//           }
//       it("should be a function", () => {
//         isFunction(postOne);
//       });
//       it("should return an object", () => {
//           postOne(expected).then(data => {
//               isObject(data);
//           })
//           .catch((err) => {
//             console.log('error 1', err);
//           })
//       });
//       it("should return a new product id for the newly added product", () => {
//           postOne(expected).then(data => {
//               equal(152, data.product_id);
//           })
//           .catch((err) => {
//             console.log('error 2', err);
//           })
//       })

//     });
// });

// // GET One
// describe("GET One Product", () => {
//     describe("get a product", () => {
//         it("should return an object", () => {
//             getOne(1).then(data => {
//                 isObject(data);
//             });
//         });
//         it("should return the correct Product object", () => {
//             return getOne(1).then(data => {
//                 let expected = {
//                     product_id: 1,
//                     product_name: "Fantastic Cotton Fish",
//                     product_type: 3,
//                     price: "800",
//                     description: "I'll generate the optical IB bus, that should firewall the XML panel!",
//                     customer_id: 19,
//                     listing_date: "2017-04-02",
//                     quantity: 46
//                 };
//                 equal(1, data.product_id);
//             });
//         });
//     });
// });

// // GET All
// describe("GET All Products", () => {
//     describe("get all products", () => {
//         it("should be an array", () => {
//             getAll().then(data => {
//                 isArray(data);
//             });
//         });
//         it("should be an array of objects", () => {
//             getAll().then(data => {
//                 isObject(data[1]);
//             });
//         });
//         it("should return the length of array of total products", () => {
//             getAll().then(data => {
//                 lengthOf(data, 152);
//             });
//         });
//     });
// });

// // CONTROLLER
