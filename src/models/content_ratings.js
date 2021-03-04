'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content_Ratings extends Model {
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

      this.hasOne(models.Contents, {
        foreignKey: 'id_Content_Rating'
      });
    }
  };
  Content_Ratings.init({
    id_Content_Type: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Content_Ratings',
  });
  return Content_Ratings;
};