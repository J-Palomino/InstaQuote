var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users/:name", function(req, res) {
    db.User.findOne({ where: { name: req.params.name } }).then(function(
      dbExamples
    ) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/user", function(req, res) {
    db.User.create({
      name: req.body.userName,
      password: req.body.password
    }).then(function(dbExample) {
      //res.render("example", dbExample);
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
