'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeConstraint('todos', 'todos_categoryId_foreign_idx')
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addConstraint('todos', ['category_id'], {
          type: 'foreign key',
          name: 'todos_categoryId_foreign_idx',
          references: { 
            table: 'todos',
            field: 'id'
          }
        })
      ]);
    });
  }
};
