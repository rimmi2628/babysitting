'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nany.init({
    user_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    average_rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nany',
  });
  return Nany;
};