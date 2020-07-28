'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('todos', [
      {
        content: '料理',
        created_at: new Date(),
        updated_at: new Date(),
        category_id: 1
      },
      {
        content: '洗濯',
        created_at: new Date(),
        updated_at: new Date(),
        category_id: 1
      },
      {
        content: 'レポート',
        created_at: new Date(),
        updated_at: new Date(),
        category_id: 2
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
