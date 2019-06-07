var db = require("../models");
var bcrypt = require("bcryptjs");

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
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    db.User.create({
<<<<<<< HEAD
      name: req.body.name,
      password: req.body.password
=======
      name: req.body.userName,
      password: hash
>>>>>>> 3b3da306bbc2e2cc9fdbbe1d88f57a9809446215
    }).then(function(dbExample) {
      //res.render("example", dbExample);
      res.json(dbExample);
    });
  });

  app.post("/api/usern/", function(req, res) {
    console.log("here");
    db.User.findOne({ where: { name: req.body.name } }).then(function(
      dbExamples
    ) {
      let goodpass = bcrypt.compareSync(req.body.password, dbExamples.password);
      res.json(goodpass);
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
