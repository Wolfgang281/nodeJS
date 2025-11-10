class CustomError extends Error {
  //? extend Error class to get access to all the properties and methods to our own class
  //~ whenever a class is created, define a constructor function
  constructor(message, statusCode) {
    super(); //? super call statement
    this.message = message;
    this.statusCode = statusCode;
  }
}
export default CustomError;
//? now create an object of this class like this --> new CustomError("message", statusCode)
//! if we want to inherit the properties of one class into another we use extends keyword
// ! whenever a class is created define a constructor function, this function initializes the variables in the class
//! inside constructor function first statement should always be super() (only when we are extending some class)
