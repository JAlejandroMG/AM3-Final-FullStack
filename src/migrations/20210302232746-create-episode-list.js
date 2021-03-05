'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Episode_Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_Content: {
        type: Sequelize.INTEGER,
        references:{
          model:"Contents",
          foreignKey:"id"
        }
      },
      season_num: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      episode_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      release_date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      episode_rating: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      episode_num: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      episode_imdb_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      episode_score_votes: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Episode_Lists');
  }
};