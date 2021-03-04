'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Directors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Contents, {
        through: 'ContentDirectors',
        foreingKey: 'id_Director'
      });
    }
  };
  Directors.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Directors',
  });
  return Directors;
};