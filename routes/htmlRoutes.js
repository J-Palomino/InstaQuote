var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/user/home", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("home", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/user/order", function(req, res) {
    db.User.findOne({ where: { id: req.params.name } }).then(function(
      dbExample
    ) {
      res.render("order", {
        users: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  app.get("/api/user/:name", function(req, res) {
    db.User.findOne({ where: { name: req.params.name } }).then(function(
      result
    ) {
      res.render("example", {
        User: result
      });
    });
  });
};
