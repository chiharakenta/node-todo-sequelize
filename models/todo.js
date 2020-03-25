'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
  });
  todo.associate = function(models) {
    todo.belongsTo(models.category);
  };
  return todo;
};