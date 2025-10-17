import jwt from "jsonwebtoken";

export const generateJWT = (id) => {
  let token = jwt.sign({ id }, "secret", {
    expiresIn: "1d",
  });
  console.log(token);
};

//~ using sign() we can generate a token
//? first argument is payload which is passed inside an object
//? second argument is a secret_key which should be same in both encoding and decoding
//? third argument is options ===> {}, in which we generally pass expiration time

//? dotenv

generateJWT("utk");
//~ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InV0ayIsImlhdCI6MTc2MDY4MDg2OSwiZXhwIjoxNzYwNzY3MjY5fQ.Dni7rvS_h3XG1DjF7P5xU-gBrj06DINAaACp7qH4qlQ
