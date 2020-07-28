'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    content: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  todo.associate = function(models) {
    todo.belongsTo(models.category);
  };
  return todo;
};