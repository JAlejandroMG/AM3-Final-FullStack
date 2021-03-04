'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContentActors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ContentActors.init({
    id_Content: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_Actor: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, 
  {
    sequelize,
    modelName: 'ContentActors',
  });
  return ContentActors;
};
