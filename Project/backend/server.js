import app from "./app.js";
import { connectDB } from "./src/config/database.config.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log(err);
        console.log(`Error while starting the server`);
        process.exit(1);
      } else console.log(`Server running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting to database`);
    console.log(err);
    process.exit(1);
  });

//? npm i express mongoose dotenv express-async-handler multer bcryptjs cloudinary cors morgan jsonwebtoken cookie-parser nodemailer twilio joi

//! after enabling 2 factor authentication
// ? 1) go to google account and search for app passwords
