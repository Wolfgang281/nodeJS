import dotenv from "dotenv";
dotenv.config({ quiet: true });

import nodemailer from "nodemailer";

const mailTransport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: process.env.NODEMAILER_SECURE,
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export default mailTransport;
