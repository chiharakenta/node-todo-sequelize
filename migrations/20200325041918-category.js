'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn('categories', 'createdAt', 'created_at'),
        queryInterface.renameColumn('categories', 'updatedAt', 'updated_at')
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.renameColumn('categories', 'created_at', 'createdAt'),
        queryInterface.renameColumn('categories', 'updated_at', 'updatedAt')
      ]);
    });
  }
};
