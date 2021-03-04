'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode_List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Contents, {
        foreignKey: 'id_Content'
      });
    }
  };
  Episode_List.init({
    id_Content: DataTypes.INTEGER,
    season_num: DataTypes.INTEGER,
    episode_name: DataTypes.STRING,
    release_date: DataTypes.STRING,
    episode_rating: DataTypes.DECIMAL,
    episode_num: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    episode_imdb_link: DataTypes.STRING,
    episode_score_votes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Episode_List',
  });
  return Episode_List;
};