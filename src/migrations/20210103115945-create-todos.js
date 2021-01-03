/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      complete: {
        type: Sequelize.BOOLEAN,
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      todoId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'todoId',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('todos');
  },
};
