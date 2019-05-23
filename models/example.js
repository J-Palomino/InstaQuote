module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    quote: {
      type: DataTypes.DECIMAL(10, 2)
    }
  });
  return Example;
};
