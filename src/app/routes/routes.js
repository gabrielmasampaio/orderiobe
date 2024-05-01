const express = require("express")
const routes = express.Router();
const itemRoute = require("./itemRoute");

//Main path - check if server is running
routes.get("/", function(req, res) {
  const body = "Api is online..."
  return res.send(body);
});

//Add other routes
routes.use(itemRoute)
// routes.use()

//teapot easter egg
routes.get("/teapot", function(req, res) {
  const body = "<h1>Just a teapot 🫖</h1>"
  return res.send(body);
});

module.exports = routes