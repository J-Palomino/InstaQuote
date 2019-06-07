module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("users", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    firstName: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    lastName: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    company: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    createdAt: { type: DataTypes.DATE, allowNull: true }
  });
  User.destroy({ where: { firstName: "Craig" } });
  User.create({
    id: 909,
    firstName: "Craig",
    lastName: "dayday",
    company: "ODGizzle",
    email: "craig@dayday.com",
    password: "password"
  });
  return User;
};
