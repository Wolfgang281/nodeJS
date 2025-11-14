import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.use(express.json()); //? to handle json data
app.use(express.urlencoded({ extended: true })); //? to handle form data

export default app;
