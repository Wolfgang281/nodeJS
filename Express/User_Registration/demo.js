import  {createReadStream, appendFileSync}  from "fs"

let write = fstat.appendFileSync("")
let read = createReadStream("./app.js", "utf-8");
console.log(read.pipe);
// src.pipe(dest)
read.pipe(write)
//! duplex stream