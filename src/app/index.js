const express = require("express")
const dbConfig = require("../database/config")
const mongoose = require("mongoose")
const cors = require("cors")
const {rateLimit} = require("express-rate-limit")
const routes = require('./routes/routes');

const app = express();

//Set middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
}));

//Set routes
app.use(routes)

try {
  // Connect to Database
  await mongoose.connect(dbConfig.uri);
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  // You may choose to handle the error in different ways, such as logging, retrying, or gracefully failing the application.
  // For now, let's rethrow the error to propagate it further.
  throw error;
}


module.exports = app