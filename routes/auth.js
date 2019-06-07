var authController = require("../controllers/authcontroller.js");

module.exports = function(app) {
  app.get("/signup", authController.signup);
};

module.exports = function(app) {
  app.get("/index", authController.index);
};

module.exports = function(app) {
  app.get("/home", authController.home);
};
 