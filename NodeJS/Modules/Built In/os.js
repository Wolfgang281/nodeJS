let os = require("os");
// import os from "os"

// console.log(os)

console.log(os.totalmem()); // this will give you total RAM present in your system in bytes.
console.log(os.totalmem() / (1024 * 1024 * 1024));
console.log(os.freemem() / (1024 * 1024 * 1024));
console.log(os.arch());
console.log(os.hostname());
console.log(os.platform());
console.log(os.cpus().length);
