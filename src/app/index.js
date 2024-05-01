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

async function connectToDatabase() {
  try {
    await mongoose.connect(dbConfig.uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

connectToDatabase()
    .then(() => {
      // Start the server after the database connection is established
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((error) => {
      console.error("Error starting server:", error);
      process.exit(1);
    });


module.exports = app