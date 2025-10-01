//~ ExpressJS ==> expressJS is a minimal, fast, flexible web framework for NodeJS that simplifies building web servers and REST APIs by providing features like routing, middleware and other HTTP utilities.

//! package.json ==> this file stores the meta-data of the project like name, author, description, keywords along with dependencies of the project (it is the heart of the project).

//? IOC --> inversion of control;
//! when framework calls/executes a function it is called IOC.

//! creating our own express server

//~ 1) before starting with any project, we need to create a separate folder and inside that folder we must have a "package.json" file (and only one should be there)

//~ 2) for this enter a command, "npm init" (init --> initialize) in the terminal or "npm init -y"
//? npm init --> create a package.json file with user-defined values
//? npm init -y --> create a package.json file with default values

//~ 3) now install the required modules
//? command ==< npm i/install <package-name>
//? command ==< npm i/install <package-name1> <package-name2> ...
//? npm i express mongodb dotenv
//? npm i express

//! there will 3 changes 1) package.json 2) node_modules 3) package-lock.json
//? "node_modules" stores all the source code of the installed packages
//? "package-lock.json" stores the information like integrity, package-version of dependent modules/packages
//? "package.json" --> here a new property is created named as "dependencies"

//~ dependencies means which different third-party modules the project is using
//! there are two major dependencies
//& --> production dependency: dependency which is required to run the project in production (live) (default dependency)

//& --> development dependency: dependency which is required to run the project in development (local). to install under dev dependency,
//? use "npm i -D <package-name>"
//? npm i nodemon -D

//? npm uninstall nodemon --> to remove any module

//? npm i module-name -g ==> g stands for global (this will install the module globally, which means we can use it anywhere in the system)
//? npm i nodemon -g

//! express framework supports MVC architecture
//? m ==> model (related to db --> schema defining)
//? v ==> view (it is deprecated), react, vue, angular
//? c ==> controller (functionality --> CRUD, routers)
