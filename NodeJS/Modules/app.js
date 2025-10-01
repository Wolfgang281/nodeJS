// ! Modules ==> it is a logical piece of code which can be used anywhere. it helps us to write clean and manageable code
//? it helps us to break-down complex problems into simple ones
//? using modules we can organize the code and also could solve the errors more easily.
//? it helps us to avoid DRY (Don't Repeat Yourself) principle

// ==> import(un-packing) and export(packing)
// ==> we have two standard formats
//? ==> commonJS modules : require(), module.exports (nodeJS uses commonJS module by-default )
//? ==> ES modules (ESM) : import and export

//! in nodeJS we have 3 types of modules
//? 1) => user-defined : these are defined by users and can be imported and exported where-ever needed.

//? 2)  => built-in: these are also called as core-modules, which are part of nodeJS installation, i.e, we don't need to install or write the code from scratch. (import and use).
// example ==> fs, http, path, crypto, os, qs, etc....

// C++(node api)   +   V8  + LIBUV (C) + ..........  ==>          nodeJS

//? 3) => third-party: these modules/libraries are installed from NPM(node package manager). using NPM we can create, install, update, delete, uninstall the third party modules
// example ==> mongodb, express, multer dotenv, etc....
