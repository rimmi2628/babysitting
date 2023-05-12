'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    nany: DataTypes.STRING,
    family: DataTypes.STRING,
    startdate: DataTypes.STRING,
    enddate: DataTypes.STRING,
    amount: DataTypes.STRING,
    action: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};