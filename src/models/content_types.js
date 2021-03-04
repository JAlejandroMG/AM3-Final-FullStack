'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content_Types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Content_Ratings, {
        foreignKey: 'id_Content_Type'
      });

      this.hasMany(models.Contents, {
        foreignKey: 'id_Content_Type'
      });
    }
  };
  Content_Types.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Content_Types',
  });
  return Content_Types;
};