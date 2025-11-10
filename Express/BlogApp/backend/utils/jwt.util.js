import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
  return token;
};

//? sign() is used to generate jwt based on payload. it accept three parameters: payload, secret, options
//? sing({payload}, secret, {options})
//~ {payload} --> it should be an object, multiple values can be added to this object
//~ secret --> secret key (used for encryption and decryption of the token)
//~ {options} --> used to define expiration time of the token
