'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('todos', ['category_id'], {
        type: 'foreign key',
        name: 'todos_category_id_foreign_idx',
        references: { 
          table: 'categories',
          field: 'id'
        },
        onDelete: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('todos', 'todos_category_id_foreign_idx')
    ]);
  }
};
