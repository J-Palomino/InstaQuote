module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });
  User.destroy({ where: { name: "admin@test" } });
  User.create({
    name: "admin@test",
    password: "password"
  });
  return User;
};
