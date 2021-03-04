'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_Content_Rating: {
        type: Sequelize.INTEGER,
        references:{
          model:"Content_Ratings",
          foreignKey:"id"
        }
      },
      id_Content_Type: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"Content_Types",
          foreignKey:"id"
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      total_seasons: {
        type: Sequelize.INTEGER
      },
      imdb_score: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      release_dates: {
        allowNull: false,
        type: Sequelize.STRING
      },
      play_time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      total_episodes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imdb_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imdb_score_votes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rating_details: {
        type: Sequelize.JSON
      },
      languages: {
        type: Sequelize.STRING
      },
      last_updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contents');
  }
};