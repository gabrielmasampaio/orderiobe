require('dotenv').config();
const app = require('./app')
const mongoose = require("mongoose");
const dbConfig = require("./database/config");
const port = process.env.PORT || '8000'

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
      app.listen(port, () => console.log(`REST API listening on port :${port}`))
    })
    .catch((error) => {
      console.error("Error starting server:", error);
      process.exit(1);
    });

module.exports = app;