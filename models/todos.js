'use strict';
module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    content: DataTypes.STRING
  }, {
    underscored: true,
  });
  todos.associate = function(models) {
    // associations can be defined here
  };
  return todos;
};