'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('todos', 'category_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('todos', 'category_id');
  }
};
