'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContentActors', {
      id_Content: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model:"Contents",
          foreignKey:"id"
        }
      },
      id_Actor: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model:"Actors",
          foreignKey:"id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContentActors');
  }
};