//!============================ commonJS format ===================
// syntax for importing ==>
//!>>>>>>>>>>>>>>>> 1) <<<<<<<<<<<<<<<<<<<<<<
//? let/const variableName = require("path of the file")
// let value = require("./file1.js"); // here extension doesn't matter
// console.log(value);

// console.log(value.string);
// console.log(value.greet());
// console.log(value.emp);

//!>>>>>>>>>>>>>>>> 2) <<<<<<<<<<<<<<<<<<<<<<
//? let/const {key1, key2, ....} = require("path of the file")

// let { greet, string, emp } = require("./file1");
// let result = greet();
// console.log(result);
// console.log(string); //  console.log(value.greet());
// console.log(emp);

// let value = require("./file1");
// console.log(value);

// value();

//!============================ ESM format ===================
//! 1) importing via destructuring --> always destructure named export (always pass the extension --> .js)
//? syntax ==> import {} from "path"
// import { emp, greet, string } from "./file1.js";
// console.log(emp);
// console.log(string);
// greet();

//! 2) importing default export
import value from "./file1.js";
console.log(value);
value("abc");
