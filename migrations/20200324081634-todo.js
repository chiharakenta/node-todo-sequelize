'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('todos', 'categoryId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'todos',
              scheme: 'schema'
            },
            key: 'id'
          },
          after: 'id'
        }, { transaction: t })
      ]);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('todos', 'categoryId', { transaction: t })
      ]);
    });
  }
};
