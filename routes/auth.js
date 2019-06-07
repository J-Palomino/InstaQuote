var authController = require("../controllers/authcontroller.js");

module.exports = function(app) {
  app.get("/index", authController.signup);
};
