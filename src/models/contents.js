'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Content_Types, {
        foreignKey: 'id_Content_Type'
      });
      this.belongsTo(models.Content_Ratings, {
        foreignKey: 'id_Content_Rating'
      });

      this.hasMany(models.Episode_List, {
        foreignKey: 'id_Content'
      });

      this.belongsToMany(models.Actors, {
        through: 'ContentActors',
        foreingKey: 'id_Content'
      });

      this.belongsToMany(models.Directors, {
        through: 'ContentDirectors',
        foreingKey: 'id_Content'
      });

      this.belongsToMany(models.Genres, {
        through: 'ContentGenres',
        foreingKey: 'id_Content'
      });
    }
  };
  Contents.init({
    id_Content_Rating: DataTypes.INTEGER,
    id_Content_Type: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    total_seasons: DataTypes.INTEGER,
    imdb_score: DataTypes.INTEGER,
    release_dates: DataTypes.STRING,
    play_time: DataTypes.STRING,
    total_episodes: DataTypes.INTEGER,
    imdb_link: DataTypes.STRING,
    imdb_score_votes: DataTypes.INTEGER,
    rating_details: DataTypes.JSON,
    languages: DataTypes.STRING,
    last_updated: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Contents',
    timestamps: false
  });
  return Contents;
};
