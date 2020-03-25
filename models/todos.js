'use strict';
module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
  });
  todos.associate = function(models) {
    todos.belongsTo(models.category);
  };
  return todos;
};